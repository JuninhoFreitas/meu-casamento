import cn from 'clsx'
import { Link } from 'components/link'
import dynamic from 'next/dynamic'
import s from './list-item.module.scss'

const Arrow = dynamic(() => import('icons/arrow-diagonal.svg'), { ssr: false })

export const ListItem = ({
  className,
  title,
  source,
  href,
  visible,
  index,
  variant,
  number,
  description,
}) => {
  if (variant === 'roadmap') {
    return (
      <div
        className={cn(className, s.item, s.roadmap, visible && s.visible)}
        style={{ '--i': index }}
      >
        <div className={s.inner}>
          {number && <div className={s.number}>{number}</div>}
          <div className={s.content}>
            {title && (
              <div className={s.title}>
                <span className={s.text}>{title}</span>
              </div>
            )}
            {description && (
              <div className={s.description}>
                <span>{description}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link
      href={href}
      className={cn(className, s.item, visible && s.visible)}
      style={{ '--i': index }}
    >
      <div className={s.inner}>
        <div className={s.title}>
          <span className={s.text}>{title}</span>
          <Arrow className={s.arrow} />
        </div>
        <div className={s.source}>
          <span>{source}</span>
        </div>
      </div>
    </Link>
  )
}
