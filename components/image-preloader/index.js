import { useEffect, useState } from 'react'
import s from './image-preloader.module.scss'

// Lista de todas as imagens que precisam ser pré-carregadas
const IMAGES_TO_PRELOAD = [
  // Imagens da pasta public/imgs
  '/imgs/027afed9-0a74-4c07-8db2-34917a62a387.jpg',
  '/imgs/1aa83356-4542-4929-b189-ab66572f6011.jpg',
  '/imgs/2a2de5cf-24e3-4165-a0e2-9e63572996c2.jpg',
  '/imgs/3b3ca2ca-b680-4856-a0d2-8f2f10e2c3d7.jpg',
  '/imgs/5055b038-4fca-4824-a51d-88081993e017.jpg',
  '/imgs/542d28ce-4bd0-4913-b04a-28d7c0f32782.jpg',
  '/imgs/556fbacf-726b-4e8d-9ffb-174cd21fac86.jpg',
  '/imgs/73ce7106-97c2-49ba-9796-08739e9be6eb.jpg',
  '/imgs/77e45fde-d5bf-43f4-b8e1-561fc06306c0.jpg',
  '/imgs/78cae6d3-f85a-4ec7-b1d3-6c995ed2083b.jpg',
  '/imgs/80597c3b-7387-40eb-9cd1-ff35c21d4705.jpg',
  '/imgs/8c3a21ad-a1d5-4d78-b462-d6b9bab5e544.jpg',
  '/imgs/90f2535d-20f6-41ae-a59c-7b0fbebaadc0.jpg',
  '/imgs/9ac9a0d6-ed73-4472-a356-361ff8866a06.jpg',
  '/imgs/9ecad912-f8ba-4839-a7f1-7f502bcdb904.jpg',
  '/imgs/a8586da8-3cd3-49b7-a727-797153cdaeab.jpg',
  '/imgs/aa3ee7f1-54ad-43ce-82f5-38386f5abfd9.jpg',
  '/imgs/ace06994-0670-4f5a-a307-593545e59ca1.jpg',
  '/imgs/bd24b4cf-bfc9-4827-b198-08de597a1317.jpg',
  '/imgs/c8971158-7592-4afa-b194-5b08d5ca2a37.jpg',
  '/imgs/cdec994e-2db2-4a26-a299-8df8fac8aca0.jpg',
  '/imgs/daf798e9-1183-496f-9401-37d4f946289e.jpg',
  '/imgs/e48aec88-dbb6-43ae-a0b8-e6ea5c44230b.jpg',
  '/imgs/e601ed95-4948-406c-9b18-f0c3400a35a6.jpg',
  '/imgs/f4ad56f3-30f1-48a3-a69a-cf228d855a0d.jpg',
  // Imagem externa do falling-petals
  'https://i.imgur.com/G4RQnIm.png',
]

export function ImagePreloader({ onComplete }) {
  const [loadedCount, setLoadedCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const totalImages = IMAGES_TO_PRELOAD.length

  useEffect(() => {
    if (typeof window === 'undefined') return

    let loaded = 0
    let errored = 0
    const imagePromises = []

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        
        img.onload = () => {
          loaded++
          setLoadedCount(loaded)
          resolve()
        }
        
        img.onerror = () => {
          errored++
          // Ainda conta como "carregado" mesmo se der erro, para não travar o loading
          loaded++
          setLoadedCount(loaded)
          resolve()
        }
        
        img.src = src
      })
    }

    // Preload todas as imagens
    IMAGES_TO_PRELOAD.forEach((src) => {
      imagePromises.push(loadImage(src))
    })

    // Quando todas as imagens terminarem (sucesso ou erro)
    Promise.all(imagePromises).then(() => {
      setIsComplete(true)
      // Pequeno delay para garantir que a UI atualize antes de esconder
      setTimeout(() => {
        if (onComplete) {
          onComplete()
        }
      }, 300)
    })
  }, [onComplete])

  const progress = totalImages > 0 ? (loadedCount / totalImages) * 100 : 0

  if (isComplete) {
    return null
  }

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.progressBar}>
          <div 
            className={s.progressFill} 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={s.progressText}>
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  )
}
