import { useEffect, useRef, useState } from 'react'
import { useIntersection } from 'react-use'
import s from './gallery-carousel.module.scss'

// Lista de imagens não utilizadas nos blocos (comentadas no image-config.js)
const UNUSED_IMAGES = [
  '2a2de5cf-24e3-4165-a0e2-9e63572996c2.jpg',
  '3b3ca2ca-b680-4856-a0d2-8f2f10e2c3d7.jpg',
  '73ce7106-97c2-49ba-9796-08739e9be6eb.jpg',
  '78cae6d3-f85a-4ec7-b1d3-6c995ed2083b.jpg',
  '80597c3b-7387-40eb-9cd1-ff35c21d4705.jpg',
  '90f2535d-20f6-41ae-a59c-7b0fbebaadc0.jpg',
  '9ecad912-f8ba-4839-a7f1-7f502bcdb904.jpg',
  'aa3ee7f1-54ad-43ce-82f5-38386f5abfd9.jpg',
  'ace06994-0670-4f5a-a307-593545e59ca1.jpg',
  'bd24b4cf-bfc9-4827-b198-08de597a1317.jpg',
  'c8971158-7592-4afa-b194-5b08d5ca2a37.jpg',
  'daf798e9-1183-496f-9401-37d4f946289e.jpg',
  'e601ed95-4948-406c-9b18-f0c3400a35a6.jpg',
  'f4ad56f3-30f1-48a3-a69a-cf228d855a0d.jpg',
]

// Inicializa GSAP de forma assíncrona
const initializeGSAP = async () => {
  if (typeof window === 'undefined') return null
  
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger')
  
  if (!gsap.plugins?.scrollTrigger) {
    gsap.registerPlugin(ScrollTrigger)
  }
  
  return { gsap, ScrollTrigger }
}

export function GalleryCarousel() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayTimerRef = useRef(null)
  const intersection = useIntersection(containerRef, {
    threshold: 0.1,
  })

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setIsVisible(true)
    }
  }, [intersection])

  // Auto-play do carrossel
  useEffect(() => {
    if (!isVisible || !isAutoPlaying) return

    const playNext = () => {
      setCurrentIndex((prev) => (prev + 1) % UNUSED_IMAGES.length)
    }

    autoPlayTimerRef.current = setInterval(playNext, 4000)

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current)
      }
    }
  }, [isVisible, isAutoPlaying])

  // Animações GSAP quando visível
  useEffect(() => {
    if (!isVisible || !containerRef.current) return

    let gsapInstance = null
    let scrollTriggerCleanup = null

    initializeGSAP().then((gsapLibs) => {
      if (!gsapLibs) return
      
      gsapInstance = gsapLibs.gsap

      const items = containerRef.current.querySelectorAll(`.${s.imageItem}`)
      const track = trackRef.current

      // Animação inicial de entrada
      gsapInstance.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
        }
      )

      scrollTriggerCleanup = () => {
        // Cleanup vazio já que não há ScrollTrigger
      }

      // Armazenar cleanup functions
      const cleanupFunctions = []

      // Animação de cada item individual
      items.forEach((item, index) => {
        gsapInstance.fromTo(
          item,
          {
            opacity: 0,
            scale: 0.8,
            rotation: index % 2 === 0 ? -10 : 10,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
          }
        )

        // Efeito hover
        const handleMouseEnter = () => {
          setIsAutoPlaying(false)
          gsapInstance.to(item, {
            scale: 1.1,
            rotation: index % 2 === 0 ? 5 : -5,
            duration: 0.5,
            ease: 'power2.out',
          })
        }

        const handleMouseLeave = () => {
          setIsAutoPlaying(true)
          gsapInstance.to(item, {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: 'power2.out',
          })
        }

        item.addEventListener('mouseenter', handleMouseEnter)
        item.addEventListener('mouseleave', handleMouseLeave)

        // Adicionar cleanup function
        cleanupFunctions.push(() => {
          item.removeEventListener('mouseenter', handleMouseEnter)
          item.removeEventListener('mouseleave', handleMouseLeave)
        })
      })

      // Atualizar cleanup para incluir todos os listeners
      scrollTriggerCleanup = () => {
        trigger?.kill()
        cleanupFunctions.forEach((cleanup) => cleanup())
      }
    })

    return () => {
      if (scrollTriggerCleanup) {
        scrollTriggerCleanup()
      }
    }
  }, [isVisible])

  // Animação de transição quando muda o índice
  useEffect(() => {
    if (!trackRef.current) return

    initializeGSAP().then((gsapLibs) => {
      if (!gsapLibs) return

      const { gsap } = gsapLibs
      const items = trackRef.current.querySelectorAll(`.${s.imageItem}`)
      const currentItem = items[currentIndex]

      if (!currentItem) return

      // Resetar todos os itens
      gsap.to(items, {
        scale: 0.9,
        opacity: 0.6,
        rotation: (index) => (index % 2 === 0 ? -5 : 5),
        duration: 0.6,
        ease: 'power2.inOut',
      })

      // Destacar item atual
      gsap.to(currentItem, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
      })

      // Mover track para centralizar item atual
      const itemWidth = currentItem.offsetWidth
      const viewport = trackRef.current.parentElement
      const viewportWidth = viewport.offsetWidth
      
      // Obtém o gap real do CSS usando getComputedStyle
      const trackStyles = window.getComputedStyle(trackRef.current)
      const gap = parseFloat(trackStyles.gap) || 40
      
      // Calcula o offset para centralizar a imagem atual
      // Posição do início do item atual no track (sem transform)
      const itemStartPosition = currentIndex * (itemWidth + gap)
      // Posição do centro do item atual no track
      const itemCenterPosition = itemStartPosition + itemWidth / 2
      // Posição do centro do viewport
      const viewportCenter = viewportWidth / 2
      // Offset necessário para centralizar: move o track para que o centro do item fique no centro do viewport
      const offset = viewportCenter - itemCenterPosition

      gsap.to(trackRef.current, {
        x: offset,
        duration: 1.2,
        ease: 'power3.out',
      })
    })
  }, [currentIndex])

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % UNUSED_IMAGES.length
    goToSlide(nextIndex)
  }

  const goPrev = () => {
    const prevIndex = (currentIndex - 1 + UNUSED_IMAGES.length) % UNUSED_IMAGES.length
    goToSlide(prevIndex)
  }

  return (
    <section ref={containerRef} className={s.container} id="gallery-carousel">
      <div className={s.wrapper}>
        <div className={s.header}>
          <h2 className={s.title}>Nossa Galeria</h2>
          <p className={s.subtitle}>Momentos especiais capturados</p>
        </div>

        <div className={s.carouselWrapper}>
          <button
            className={s.navButton}
            onClick={goPrev}
            aria-label="Imagem anterior"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className={s.viewport}>
            <div ref={trackRef} className={s.track}>
              {UNUSED_IMAGES.map((image, index) => (
                <div
                  key={image}
                  className={`${s.imageItem} ${index === currentIndex ? s.active : ''}`}
                  onClick={() => goToSlide(index)}
                >
                  <div className={s.imageWrapper}>
                    <img
                      src={`/imgs/${image}`}
                      alt={`Foto ${index + 1} da galeria`}
                      className={s.image}
                      loading="lazy"
                    />
                    <div className={s.overlay}>
                      <div className={s.overlayContent}>
                        <span className={s.imageNumber}>{index + 1}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className={s.navButton}
            onClick={goNext}
            aria-label="Próxima imagem"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className={s.indicators}>
          {UNUSED_IMAGES.map((_, index) => (
            <button
              key={index}
              className={`${s.indicator} ${index === currentIndex ? s.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para imagem ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
