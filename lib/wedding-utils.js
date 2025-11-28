export const calculateDaysLeft = (dateISO) => {
  const weddingDate = new Date(dateISO)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  weddingDate.setHours(0, 0, 0, 0)
  const diffTime = weddingDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 0
}

