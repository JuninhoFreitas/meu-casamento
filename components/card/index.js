import cn from 'clsx'
import s from './card.module.scss'

export const Card = ({
  number,
  text,
  children,
  className,
  inverted,
  background = 'rgba(14, 14, 14, 0.15)',
}) => {
  return (
    <div
      className={cn(className, s.wrapper, inverted && s.inverted)}
      style={{ '--background': background }}
    >
      {number && (
        <p className={s.number}>{number.toString().padStart(2, '0')}</p>
      )}
      {(text || children) && (
        <div className={s.text}>
          {text || children}
        </div>
      )}
    </div>
  )
}
