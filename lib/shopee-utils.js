/**
 * Utilitários para processar dados da Shopee
 */

/**
 * Formata o preço da Shopee para reais (R$)
 * Os valores da Shopee vêm em uma unidade onde precisamos dividir por 100000 para obter reais
 * @param {string|number} priceValue - Preço no formato da Shopee
 * @returns {string} Preço formatado em reais
 */
export function formatPrice(priceValue) {
  const price = typeof priceValue === 'string' ? parseInt(priceValue, 10) : priceValue
  const priceInReais = price / 100000
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(priceInReais)
}

/**
 * Processa um item da lista de produtos da Shopee
 * @param {object} item - Item da API da Shopee
 * @returns {object} Item processado com dados formatados
 */
export function processShopeeItem(item) {
  const { itemCard, link, linkName, image, linkId } = item
  const { itemCardDisplayedAsset, itemData } = itemCard || {}

  // Extrair imagem completa
  let imageUrl = image || ''

  // Se a imagem não tem URL completa, construir
  if (imageUrl && !imageUrl.startsWith('http')) {
    if (imageUrl.startsWith('sg-') || imageUrl.startsWith('br-')) {
      imageUrl = `https://cf.shopee.sg/file/${imageUrl}`
    } else if (imageUrl.includes('.')) {
      // Se parece ser um nome de arquivo, tentar construir URL
      imageUrl = `https://cf.shopee.sg/file/${imageUrl}`
    }
  }

  // Usar imagem do itemCard se disponível e melhor
  if (itemCardDisplayedAsset?.image) {
    const cardImage = itemCardDisplayedAsset.image
    if (cardImage.startsWith('http')) {
      imageUrl = cardImage
    } else if (cardImage.startsWith('sg-') || cardImage.startsWith('br-')) {
      imageUrl = `https://cf.shopee.sg/file/${cardImage}`
    } else if (cardImage.includes('.')) {
      imageUrl = `https://cf.shopee.sg/file/${cardImage}`
    }
  }

  // Fallback: usar primeira imagem do array de imagens se disponível
  if (!imageUrl && itemCardDisplayedAsset?.images && itemCardDisplayedAsset.images.length > 0) {
    const firstImage = itemCardDisplayedAsset.images[0]
    if (firstImage.startsWith('http')) {
      imageUrl = firstImage
    } else if (firstImage.startsWith('sg-') || firstImage.startsWith('br-')) {
      imageUrl = `https://cf.shopee.sg/file/${firstImage}`
    }
  }

  // Garantir que temos uma imagem válida
  if (!imageUrl || (!imageUrl.startsWith('http') && !imageUrl.startsWith('//'))) {
    imageUrl = '/placeholder-image.jpg' // Fallback para imagem placeholder
  }

  // Extrair preço
  const price = itemCardDisplayedAsset?.displayPrice?.price || itemData?.itemCardDisplayPrice?.price || '0'
  const originalPrice = itemData?.itemCardDisplayPrice?.originalPrice || price
  const discount = itemData?.itemCardDisplayPrice?.discount || 0

  // Verificar disponibilidade
  const isSoldOut = itemData?.isSoldOut || itemCardDisplayedAsset?.itemCardMask?.maskType === 1

  return {
    id: item.itemId || item.linkId,
    linkId: linkId || item.linkId,
    name: linkName || itemCardDisplayedAsset?.name || 'Produto sem nome',
    image: imageUrl,
    price: formatPrice(price),
    originalPrice: formatPrice(originalPrice),
    discount: discount,
    link: link,
    isSoldOut: isSoldOut,
    soldCount: itemCardDisplayedAsset?.soldCount?.text || itemData?.itemCardDisplaySoldCount?.historicalSoldCountText || '',
  }
}

/**
 * Busca a lista de produtos da Shopee
 * @param {string} urlSuffix - Sufixo da URL da loja (ex: 'joaoegabrielle')
 * @returns {Promise<object>} Dados da lista de produtos
 */
export async function fetchShopeeProducts(urlSuffix = 'joaoegabrielle') {
  try {
    const response = await fetch('https://collshp.com/api/v3/gql/graphql?q=StorefrontProductListQuery', {
      method: 'POST',
      headers: {
        'accept': 'application/json, text/plain, */*',
        'content-type': 'application/json;charset=UTF-8',
        'origin': 'https://collshp.com',
        'referer': `https://collshp.com/${urlSuffix}?view=storefront`,
      },
      body: JSON.stringify({
        operationName: 'StorefrontProductListQuery',
        query: `query StorefrontProductListQuery($urlSuffix: String, $keyword: String, $sortType: SortType, $groupId: Long, $linkId: Long, $page: LinktreelandingpagePaginationInput, $listType: MyCollectionListType, $affiliateMeta: AffiliateMetaInput, $buyerId: Long, $uuId: String, $deviceId: String, $cid: String, $language: String) {
          storefrontProductList(
            urlSuffix: $urlSuffix
            keyword: $keyword
            sortType: $sortType
            groupId: $groupId
            linkId: $linkId
            page: $page
            listType: $listType
            affiliateMeta: $affiliateMeta
            buyerId: $buyerId
            uuId: $uuId
            deviceId: $deviceId
            cid: $cid
            language: $language
          ) {
            itemList {
              linkId
              link
              linkName
              image
              linkType
              itemId
              isPined
              h5Link
              itemCard
            }
            pagination {
              offset
              limit
              hasMore
              totalCount
            }
          }
        }`,
        variables: {
          urlSuffix: urlSuffix,
          affiliateMeta: {
            affiliateId: '18385560781',
            userId: '385358556',
          },
          cid: 'br',
          uuId: 'ab982259-bfd3-4573-9d20-617dfb556033',
          deviceId: 'D3EA80BD6362DB8DDBAE744067EE321F',
          language: 'pt-BR',
          page: {
            offset: '0',
            limit: '20',
            hasMore: false,
            totalCount: '0',
          },
          sortType: 'ITEM_CREATE_LATEST',
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar produtos da Shopee:', error)
    throw error
  }
}
