import { useEffect } from 'react'
import { useWindowSize } from 'react-use'
import { useStore } from 'lib/store'

export const useScrollThresholds = ({
  whyRect,
  cardsRect,
  whiteRect,
  inuseRect,
  lenisLimit,
}) => {
  const { height: windowHeight } = useWindowSize()
  const addThreshold = useStore(({ addThreshold }) => addThreshold)

  useEffect(() => {
    addThreshold({ id: 'top', value: 0 })
  }, [addThreshold])

  useEffect(() => {
    if (!whyRect.top) return
    const top = whyRect.top - windowHeight / 2
    addThreshold({ id: 'why-start', value: top })
    addThreshold({
      id: 'why-end',
      value: top + whyRect.height,
    })
  }, [whyRect, windowHeight, addThreshold])

  useEffect(() => {
    if (!cardsRect.top) return
    const top = cardsRect.top - windowHeight / 2
    addThreshold({ id: 'cards-start', value: top })
    addThreshold({ id: 'cards-end', value: top + cardsRect.height })
    addThreshold({
      id: 'red-end',
      value: top + cardsRect.height + windowHeight,
    })
  }, [cardsRect, windowHeight, addThreshold])

  useEffect(() => {
    if (!whiteRect.top) return
    const top = whiteRect.top - windowHeight
    addThreshold({ id: 'light-start', value: top })
  }, [whiteRect, windowHeight, addThreshold])

  useEffect(() => {
    if (!inuseRect.top) return
    const top = inuseRect.top
    addThreshold({ id: 'in-use', value: top })
  }, [inuseRect, addThreshold])

  useEffect(() => {
    if (!lenisLimit) return
    addThreshold({ id: 'end', value: lenisLimit })
  }, [lenisLimit, addThreshold])
}

