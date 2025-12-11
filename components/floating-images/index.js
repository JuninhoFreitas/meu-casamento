import { useScroll } from 'hooks/use-scroll'
import { useStore } from 'lib/store'
import { useEffect, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'
import { IMAGE_CONFIG } from './image-config'
import s from './floating-images.module.scss'

function FloatingImage({ config, index }) {
  const imageRef = useRef(null)
  const containerRef = useRef(null)
  const targetElementRef = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [targetElement, setTargetElement] = useState(null)
  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const lenis = useStore(({ lenis }) => lenis)

  const {
    image,
    targetElementId,
    side = 'right',
    offset = 0,
    rotation = (Math.random() - 0.5) * 12,
    scale = 0.85 + Math.random() * 0.15,
    styles = {},
  } = config

  // Encontra o elemento alvo pelo ID
  useEffect(() => {
    if (typeof window === 'undefined') return

    const findTargetElement = () => {
      const element = document.getElementById(targetElementId)
      if (element) {
        setTargetElement(element)
        targetElementRef.current = element
      } else {
        // Se o elemento ainda não existe, tenta novamente após um delay
        setTimeout(findTargetElement, 100)
      }
    }

    findTargetElement()

    // Observa mudanças no DOM para detectar quando o elemento é adicionado
    const observer = new MutationObserver(() => {
      if (!targetElementRef.current) {
        const element = document.getElementById(targetElementId)
        if (element) {
          setTargetElement(element)
          targetElementRef.current = element
        }
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [targetElementId])

  // Controla visibilidade e posição baseada na posição do elemento alvo
  useScroll(() => {
    if (!containerRef.current || !targetElement || !lenis) return

    const targetRect = targetElement.getBoundingClientRect()
    const viewportHeight = windowHeight
    const isMobile = windowWidth <= 800

    // Verifica se o elemento alvo está visível na viewport
    // A imagem aparece quando o elemento está parcialmente visível
    const isTargetVisible =
      targetRect.bottom > -viewportHeight * 0.5 && // Elemento não está muito acima da viewport
      targetRect.top < viewportHeight * 1.5 && // Elemento não está muito abaixo da viewport
      targetRect.width > 0 &&
      targetRect.height > 0

    if (isTargetVisible && !isExpanded) {
      // Calcula a posição Y baseada no elemento alvo
      // A imagem fica posicionada no meio vertical do elemento alvo + offset
      const targetCenterY = targetRect.top + targetRect.height / 2
      const imageHeight = isMobile ? windowWidth * 0.25 : 350 // altura aproximada da imagem
      const imageY = targetCenterY + offset - imageHeight / 2

      // Calcula a posição X baseada no lado especificado
      let xPosition
      if (isMobile) {
        // Em mobile: sempre à direita mostrando 10vw
        xPosition = { left: 'calc(100vw - 10vw)', right: 'auto' }
      } else {
        // Em desktop: posiciona baseado no lado especificado
        if (side === 'right') {
          const margin = 10
          xPosition = { left: 'auto', right: `${margin}px` }
        } else {
          const margin = 10
          xPosition = { left: `${margin}px`, right: 'auto' }
        }
      }

      // Aplica estilos base (posicionamento)
      containerRef.current.style.opacity = '1'
      containerRef.current.style.top = `${imageY}px`
      containerRef.current.style.left = xPosition.left || 'auto'
      containerRef.current.style.right = xPosition.right || 'auto'
      containerRef.current.style.transform = `translate(0, 0) rotate(${rotation}deg) scale(${scale})`
      
      // Aplica estilos customizados do config (sobrescreve apenas se não forem propriedades de posicionamento)
      Object.keys(styles).forEach((key) => {
        const value = styles[key]
        // Aplica diretamente - React usa camelCase para propriedades CSS
        containerRef.current.style[key] = value
      })

      if (!isVisible) {
        setIsVisible(true)
      }
    } else if (!isExpanded) {
      // Esconde a imagem quando o elemento alvo não está visível
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

  // Merge custom styles with default styles
  const containerStyles = {
    zIndex: isExpanded ? 1000 : 10 + index,
    ...styles, // Custom styles from config
  }

  return (
    <div
      ref={containerRef}
      className={`${s.imageContainer} ${isVisible ? s.visible : ''} ${isExpanded ? s.expanded : ''}`}
      style={containerStyles}
      onClick={(e) => {
        e.stopPropagation()
        handleClick()
      }}
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
          src={`/imgs/${image}`}
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
      {IMAGE_CONFIG.map((config, index) => (
        <FloatingImage
          key={`${config.image}-${index}`}
          config={config}
          index={index}
        />
      ))}
    </div>
  )
}
