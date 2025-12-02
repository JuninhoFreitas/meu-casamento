import { useScroll } from 'hooks/use-scroll'
import { useStore } from 'lib/store'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'
import s from './floating-images.module.scss'

// Lista de todas as imagens da pasta public/imgs
const IMAGES = [
  '027afed9-0a74-4c07-8db2-34917a62a387.jpg',
  '1aa83356-4542-4929-b189-ab66572f6011.jpg',
  '2a2de5cf-24e3-4165-a0e2-9e63572996c2.jpg',
  '3b3ca2ca-b680-4856-a0d2-8f2f10e2c3d7.jpg',
  '5055b038-4fca-4824-a51d-88081993e017.jpg',
  '542d28ce-4bd0-4913-b04a-28d7c0f32782.jpg',
  '556fbacf-726b-4e8d-9ffb-174cd21fac86.jpg',
  '73ce7106-97c2-49ba-9796-08739e9be6eb.jpg',
  '77e45fde-d5bf-43f4-b8e1-561fc06306c0.jpg',
  '78cae6d3-f85a-4ec7-b1d3-6c995ed2083b.jpg',
  '80597c3b-7387-40eb-9cd1-ff35c21d4705.jpg',
  '8c3a21ad-a1d5-4d78-b462-d6b9bab5e544.jpg',
  '90f2535d-20f6-41ae-a59c-7b0fbebaadc0.jpg',
  '9ac9a0d6-ed73-4472-a356-361ff8866a06.jpg',
  '9ecad912-f8ba-4839-a7f1-7f502bcdb904.jpg',
  'a8586da8-3cd3-49b7-a727-797153cdaeab.jpg',
  'aa3ee7f1-54ad-43ce-82f5-38386f5abfd9.jpg',
  'ace06994-0670-4f5a-a307-593545e59ca1.jpg',
  'bd24b4cf-bfc9-4827-b198-08de597a1317.jpg',
  'c8971158-7592-4afa-b194-5b08d5ca2a37.jpg',
  'cdec994e-2db2-4a26-a299-8df8fac8aca0.jpg',
  'daf798e9-1183-496f-9401-37d4f946289e.jpg',
  'e48aec88-dbb6-43ae-a0b8-e6ea5c44230b.jpg',
  'e601ed95-4948-406c-9b18-f0c3400a35a6.jpg',
  'f4ad56f3-30f1-48a3-a69a-cf228d855a0d.jpg',
]

// Áreas preferenciais para posicionar imagens (baseado nas seções da página)
// Valores são progresso do scroll (0 a 1) onde há menos conteúdo
const PREFERRED_AREAS = [
  { start: 0.05, end: 0.15, side: 'right' }, // Após hero
  { start: 0.25, end: 0.35, side: 'right' }, // Durante why
  { start: 0.45, end: 0.55, side: 'right' }, // Durante story
  { start: 0.65, end: 0.75, side: 'right' }, // Durante solution
  { start: 0.80, end: 0.90, side: 'right' }, // Durante featuring
]

function FloatingImage({ src, index, total }) {
  const imageRef = useRef(null)
  const containerRef = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const lenis = useStore(({ lenis }) => lenis)

  // Calcula posição inicial baseada no índice
  const position = useMemo(() => {
    const areaIndex = index % PREFERRED_AREAS.length
    const area = PREFERRED_AREAS[areaIndex]
    const progressInArea = (index % total) / total
    const scrollProgress = area.start + (area.end - area.start) * progressInArea

    // Posição X baseada no lado preferido
    const isRight = area.side === 'right'
    // Em desktop: imagens do lado direito sempre ficam na última coluna (coluna 12)
    // Usamos um valor fixo para garantir consistência
    // Para imagens do lado esquerdo, mantemos variação baseada no índice
    const xPercent = isRight
      ? 93 // Valor fixo para garantir posicionamento consistente à direita
      : 10 + (index % 10) * 2 // 10-28% da largura, baseado no índice (determinístico)

    return {
      scrollProgress,
      xPercent,
      isRight, // Armazena o lado para uso consistente no useScroll
      rotation: (Math.random() - 0.5) * 12, // Rotação aleatória entre -6 e 6 graus
      scale: 0.85 + Math.random() * 0.15, // Escala entre 0.85 e 1.0
    }
  }, [index, total])

  // Controla visibilidade e posição baseada no scroll
  useScroll(({ scroll, limit }) => {
    if (!containerRef.current || !lenis) return
    
    // Se limit não estiver disponível ainda, usa um valor padrão baseado no scroll atual
    const scrollLimit = limit || scroll * 2 || windowHeight * 10

    const targetScrollY = position.scrollProgress * scrollLimit
    const currentScrollY = scroll
    const distance = Math.abs(currentScrollY - targetScrollY)
    const viewportHeight = windowHeight
    const isMobile = windowWidth <= 800 // Breakpoint mobile

    // Imagem fica visível quando está próxima da sua posição alvo
    // Aumenta o range de visibilidade para garantir que apareçam
    const visibilityRange = viewportHeight * 2.5
    const shouldBeVisible = distance < visibilityRange

    if (shouldBeVisible && !isExpanded) {
      // Quando a imagem está visível, sempre usa opacidade 100%
      const opacity = 1

      // Calcula posição Y relativa ao scroll
      const relativeY = targetScrollY - currentScrollY
      const yOffset = relativeY + windowHeight * 0.15 // Offset para não ficar no topo

      if (containerRef.current) {
        // Em mobile: o CSS já posiciona à direita mostrando apenas 10vw
        // Em desktop: posiciona imagens do lado direito na última coluna
        if (isMobile) {
          // Em mobile: posiciona com left: calc(100vw - 10vw) para mostrar 10% da largura da viewport
          containerRef.current.style.opacity = opacity.toString()
          containerRef.current.style.left = 'calc(100vw - 10vw)'
          containerRef.current.style.right = 'auto'
          containerRef.current.style.transform = `translate(0, ${yOffset}px) rotate(${position.rotation}deg) scale(${position.scale})`
        } else {
          // Em desktop: TODAS as imagens ficam à direita na última coluna (coluna 12)
          // Margin desktop é 40px - sempre posiciona na mesma posição à direita
          const margin = 10 // desktop margin
          const rightPosition = margin
          
          containerRef.current.style.opacity = opacity.toString()
          containerRef.current.style.left = 'auto'
          containerRef.current.style.right = `${rightPosition}px`
          containerRef.current.style.transform = `translate(0, ${yOffset}px) rotate(${position.rotation}deg) scale(${position.scale})`
        }
      }

      if (!isVisible) {
        setIsVisible(true)
      }
    } else if (!isExpanded) {
      if (isVisible) {
        setIsVisible(false)
        if (containerRef.current) {
          containerRef.current.style.opacity = '0'
        }
      }
    }
  })

  // Inicializa posição no mount
  useEffect(() => {
    if (!containerRef.current) return
    
    const isMobile = windowWidth <= 800
    if (isMobile) {
      containerRef.current.style.left = 'calc(100vw - 10vw)'
      containerRef.current.style.right = 'auto'
    }
  }, [windowWidth])

  const handleClick = () => {
    setIsExpanded(!isExpanded)
  }

  // const handleMouseEnter = () => {
  //   if (windowWidth > 800) {
  //     setIsExpanded(true)
  //   }
  // }

  // const handleMouseLeave = () => {
  //   if (windowWidth > 800) {
  //     setIsExpanded(false)
  //   }
  // }

  // Fecha ao clicar fora quando expandido
  useEffect(() => {
    if (!isExpanded) return

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isExpanded])

  return (
    <div
      ref={containerRef}
      className={`${s.imageContainer} ${isVisible ? s.visible : ''} ${isExpanded ? s.expanded : ''}`}
      style={{
        zIndex: isExpanded ? 1000 : 10 + index
      }}
      onClick={(e) => {
        e.stopPropagation()
        handleClick()
      }}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      aria-label="Expandir imagem"
    >
      <div className={s.imageWrapper}>
        <img
          ref={imageRef}
          src={src}
          alt=""
          className={s.image}
          loading="lazy"
        />
        {windowWidth <= 800 && (
          <div className={s.expandIcon}>
            <div className={s.expandIconInner} />
          </div>
        )}
      </div>
    </div>
  )
}

export function FloatingImages({ roadmapRef }) {
  const [isHidden, setIsHidden] = useState(false)
  const { height: windowHeight } = useWindowSize()

  useScroll(() => {
    if (!roadmapRef?.current) {
      // Se não houver roadmapRef, sempre mostra as imagens
      if (isHidden) {
        setIsHidden(false)
      }
      return
    }

    const rect = roadmapRef.current.getBoundingClientRect()
    // Se a seção roadmap estiver visível na tela
    // Só esconde se estiver completamente visível (top < 0 e bottom > windowHeight)
    const isFullyVisible = rect.top < 0 && rect.bottom > windowHeight
    
    // Só esconde quando a seção está completamente visível
    if (isFullyVisible !== isHidden) {
      setIsHidden(isFullyVisible)
    }
  })

  return (
    <div 
      className={s.container}
      style={{ 
        opacity: isHidden ? 0 : 1,
        transition: 'opacity 0.5s ease'
      }}
    >
      {IMAGES.map((image, index) => (
        <FloatingImage
          key={image}
          src={`/imgs/${image}`}
          index={index}
          total={IMAGES.length}
        />
      ))}
    </div>
  )
}

