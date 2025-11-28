import { useState, useEffect } from 'react'
import { calculateDaysLeft } from 'lib/wedding-utils'

export const useDaysLeft = (dateISO) => {
  const [daysLeft, setDaysLeft] = useState(() => calculateDaysLeft(dateISO))

  useEffect(() => {
    const interval = setInterval(() => {
      setDaysLeft(calculateDaysLeft(dateISO))
    }, 1000 * 60 * 60) // Update every hour

    return () => clearInterval(interval)
  }, [dateISO])

  return daysLeft
}

