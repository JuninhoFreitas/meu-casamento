import { useEffect, useState } from 'react'
import { useStore } from 'lib/store'
import cn from 'clsx'
import s from './scroll-alert.module.scss'
import { RotatingRings } from '../rotating-rings'

export function ScrollAlert() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const lenis = useStore(({ lenis }) => lenis)
  const introOut = useStore(({ introOut }) => introOut)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detecta se é mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 800)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Verifica se já foi fechado antes
    // if (typeof window !== 'undefined') {
    //   const dismissed = localStorage.getItem('scroll-alert-dismissed')
    //   if (dismissed === 'true') {
    //     setIsDismissed(true)
    //     return
    //   }
    // }

    // Check for hash in URL - if present, don't show alert and ensure lenis is started
    const checkHash = () => {
      return typeof window !== 'undefined' && window.location.hash
    }

    const hasHash = checkHash()
    
    // If there's a hash, ensure lenis is started and don't show alert
    if (hasHash) {
      if (lenis) {
        lenis.start()
      }
      setIsVisible(false)
      setIsDismissed(true)
      return
    }

    // No mobile, mostra após um delay maior (intro é pulada)
    // No desktop, mostra quando a intro terminar
    const shouldShow = isMobile ? true : introOut

    if (shouldShow) {
      // Delay maior no mobile para garantir que a página carregou
      const delay = isMobile ? 2000 : 500
      const showTimer = setTimeout(() => {
        // Double check hash hasn't appeared during delay
        if (!checkHash()) {
          setIsVisible(true)
          if (lenis) {
            lenis.stop()
          }
        }
      }, delay)

      return () => {
        clearTimeout(showTimer)
      }
    }
  }, [introOut, lenis, isMobile])

  // Monitor hash changes and auto-dismiss alert if hash appears
  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        setIsVisible(false)
        setIsDismissed(true)
        if (lenis) {
          lenis.start()
        }
      }
    }

    // Check on mount and listen for hash changes
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [lenis])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
    if (lenis) {
      lenis.start()
    }
    // Salva no localStorage para não mostrar novamente
    if (typeof window !== 'undefined') {
      // localStorage.setItem('scroll-alert-dismissed', 'true')
    }
  }


  if (isDismissed || !isVisible) return null

  return (
    <div className={cn(s.alert, isVisible && s.visible)}>
      <div className={s.content}>
        <div className={s.icon} style={{ width: '100%', height: '100%', left: 'auto', right: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <RotatingRings />
        </div>
        <p className={s.message}>
          Continue deslizando a tela para baixo até encontrar uma{' '}
          <strong>aliança girando</strong> 💫
        </p>
        <button type="button" className={s.closeButton} onClick={handleDismiss}>
          Entendi!
        </button>
      </div>
    </div>
  )
}
