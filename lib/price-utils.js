/**
 * Converte um valor em formato brasileiro (R$ 1.250,00) para número
 * @param {string} priceString - String no formato "R$ 1.250,00"
 * @returns {number} - Valor numérico
 */
export function parsePrice(priceString) {
  if (!priceString) return 0
  
  // Remove "R$", espaços e converte vírgula para ponto
  const cleaned = priceString
    .replace(/R\$/g, '')
    .replace(/\s/g, '')
    .replace(/\./g, '')
    .replace(',', '.')
  
  return parseFloat(cleaned) || 0
}

/**
 * Formata um número para formato brasileiro de moeda
 * @param {number} value - Valor numérico
 * @returns {string} - String formatada como "R$ 1.250,00"
 */
export function formatPrice(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
