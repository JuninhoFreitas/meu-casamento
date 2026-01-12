import cn from 'clsx'
import s from './product-card.module.scss'

export function ProductCard({ product, className }) {
  const handleClick = () => {
    if (product.linkId) {
      const url = `https://collshp.com/joaoegabrielle?linkId=${product.linkId}&view=storefront`
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className={cn(s.card, className, product.isSoldOut && s.soldOut)} onClick={handleClick}>
      <div className={s.imageWrapper}>
        <img src={product.image} alt={product.name} className={s.image} loading="lazy" />
        {product.isSoldOut && (
          <div className={s.soldOutBadge}>
            <span>Esgotado</span>
          </div>
        )}
        {product.discount > 0 && !product.isSoldOut && (
          <div className={s.discountBadge}>
            <span>-{product.discount}%</span>
          </div>
        )}
      </div>
      <div className={s.content}>
        <h3 className={s.title}>{product.name}</h3>
        <div className={s.priceWrapper}>
          {product.discount > 0 && (
            <span className={s.originalPrice}>{product.originalPrice}</span>
          )}
          <span className={s.price}>{product.price}</span>
        </div>
        {/* {product.soldCount && (
          <p className={s.soldCount}>{product.soldCount}</p>
        )} */}
      </div>
    </div>
  )
}
