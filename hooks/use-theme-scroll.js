import { useRef } from 'react'
import { useRect } from '@darkroom.engineering/hamo'
import { useWindowSize } from 'react-use'
import { useScroll } from 'hooks/use-scroll'
import { clamp, mapRange } from 'lib/maths'

export const useThemeScroll = (setTheme) => {
  const zoomRef = useRef(null)
  const [zoomWrapperRectRef, zoomWrapperRect] = useRect()
  const { height: windowHeight } = useWindowSize()

  useScroll(({ scroll }) => {
    if (!zoomWrapperRect.top || !zoomRef.current) return

    const start = zoomWrapperRect.top + windowHeight * 0.5
    const end = zoomWrapperRect.top + zoomWrapperRect.height - windowHeight

    const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1)
    const center = 0.6
    const progress1 = clamp(0, mapRange(0, center, progress, 0, 1), 1)
    const progress2 = clamp(0, mapRange(center - 0.055, 1, progress, 0, 1), 1)
    setTheme(progress2 === 1 ? 'light' : 'light')

    zoomRef.current.style.setProperty('--progress1', progress1)
    zoomRef.current.style.setProperty('--progress2', progress2)

    if (progress === 1) {
      zoomRef.current.style.setProperty('background-color', 'currentColor')
    } else {
      zoomRef.current.style.removeProperty('background-color')
    }
  })

  return { zoomRef, zoomWrapperRectRef }
}

