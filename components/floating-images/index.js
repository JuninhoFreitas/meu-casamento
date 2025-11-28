import { useScroll } from 'hooks/use-scroll'
import { clamp } from 'lib/maths'
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
  { start: 0.25, end: 0.35, side: 'left' }, // Durante why
  { start: 0.45, end: 0.55, side: 'right' }, // Durante story
  { start: 0.65, end: 0.75, side: 'left' }, // Durante solution
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
    const xPercent = isRight
      ? 60 + Math.random() * 30 // 60-90% da largura
      : 10 + Math.random() * 20 // 10-30% da largura

    return {
      scrollProgress,
      xPercent,
      rotation: (Math.random() - 0.5) * 12, // Rotação aleatória entre -6 e 6 graus
      scale: 0.85 + Math.random() * 0.15, // Escala entre 0.85 e 1.0
    }
  }, [index, total])

  // Controla visibilidade e posição baseada no scroll
  useScroll(({ scroll, limit }) => {
    if (!containerRef.current || !lenis || !limit) return

    const targetScrollY = position.scrollProgress * limit
    const currentScrollY = scroll
    const distance = Math.abs(currentScrollY - targetScrollY)
    const viewportHeight = windowHeight

    // Imagem fica visível quando está próxima da sua posição alvo
    const visibilityRange = viewportHeight * 1.5
    const shouldBeVisible = distance < visibilityRange

    if (shouldBeVisible && !isExpanded) {
      // Calcula opacidade baseada na proximidade
      const maxDistance = viewportHeight * 1.0
      const opacity = clamp(0, 1 - distance / maxDistance, 1)

      // Calcula posição Y relativa ao scroll
      const relativeY = targetScrollY - currentScrollY
      const yOffset = relativeY + windowHeight * 0.15 // Offset para não ficar no topo

      if (containerRef.current) {
        const x = (windowWidth * position.xPercent) / 100
        containerRef.current.style.opacity = opacity.toString()
        containerRef.current.style.transform = `translate(${x}px, ${yOffset}px) rotate(${position.rotation}deg) scale(${position.scale})`
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
        zIndex: isExpanded ? 1000 : 10 + index,
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
      </div>
    </div>
  )
}

export function FloatingImages({ roadmapRef }) {
  const [isHidden, setIsHidden] = useState(false)
  const { height: windowHeight } = useWindowSize()

  useScroll(() => {
    if (!roadmapRef?.current) return

    const rect = roadmapRef.current.getBoundingClientRect()
    // Se a seção roadmap estiver visível na tela
    const isVisible = rect.top < windowHeight && rect.bottom > 0
    
    if (isVisible !== isHidden) {
      setIsHidden(isVisible)
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

