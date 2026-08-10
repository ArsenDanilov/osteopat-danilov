import { useState } from 'react'
import { reviews, type Review } from '../../content/reviews'
import styles from './Reviews.module.css'

const reviewSources = {
  prodoctorov: {
    label: 'ПроДокторов',
    url: 'https://prodoctorov.ru/moskva/vrach/473003-danilov/#rating',
  },
  zoon: {
    label: 'Zoon',
    url: 'https://zoon.ru/msk/p-doctor/dmitrij_leonidovich_danilov/#reviews',
  },
} as const

type NavigationDirection = 'previous' | 'next'

function getReviewSource(review: Review) {
  return review.source.includes('prodoctorov.ru')
    ? reviewSources.prodoctorov
    : reviewSources.zoon
}

function ReviewContent({
  review,
  className,
  isActive,
  onAnimationEnd,
}: {
  review: Review
  className?: string
  isActive: boolean
  onAnimationEnd?: () => void
}) {
  const source = getReviewSource(review)
  const classes = [styles.review, className].filter(Boolean).join(' ')

  return (
    <blockquote
      aria-hidden={!isActive || undefined}
      className={classes}
      inert={!isActive}
      onAnimationEnd={onAnimationEnd}
    >
      <p className={styles.reviewText}>{review.text}</p>
      <footer className={styles.attribution}>
        <span className={styles.author}>Пациент</span>
        <cite className={styles.source}>
          <a href={source.url} rel="noopener noreferrer" target="_blank">
            {source.label} <span aria-hidden="true">↗</span>
          </a>
        </cite>
      </footer>
    </blockquote>
  )
}

export function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState<NavigationDirection>('next')
  const isTransitioning = previousIndex !== null

  function navigate(nextIndex: number, nextDirection: NavigationDirection) {
    if (isTransitioning || nextIndex < 0 || nextIndex >= reviews.length) {
      return
    }

    setPreviousIndex(activeIndex)
    setDirection(nextDirection)
    setActiveIndex(nextIndex)
  }

  const currentAnimationClass = isTransitioning
    ? direction === 'next'
      ? styles.enterNext
      : styles.enterPrevious
    : undefined
  const previousAnimationClass =
    direction === 'next' ? styles.exitNext : styles.exitPrevious

  return (
    <section
      aria-labelledby="reviews-title"
      className={styles.reviews}
      id="reviews"
    >
      <div className={`container ${styles.layout}`}>
        <h2 className={styles.title} id="reviews-title">
          Отзывы пациентов
        </h2>

        <div className={styles.navigation}>
          <span aria-live="polite" className={styles.counter}>
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(reviews.length).padStart(2, '0')}
          </span>
          <div
            aria-label="Навигация по отзывам"
            className={styles.controls}
            role="group"
          >
            <button
              aria-label="Предыдущий отзыв"
              className={styles.controlButton}
              disabled={activeIndex === 0 || isTransitioning}
              onClick={() => navigate(activeIndex - 1, 'previous')}
              type="button"
            >
              <svg
                aria-hidden="true"
                className={styles.controlIcon}
                viewBox="0 0 24 24"
              >
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              aria-label="Следующий отзыв"
              className={styles.controlButton}
              disabled={activeIndex === reviews.length - 1 || isTransitioning}
              onClick={() => navigate(activeIndex + 1, 'next')}
              type="button"
            >
              <svg
                aria-hidden="true"
                className={styles.controlIcon}
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.reviewStage}>
          {reviews.map((review, index) => {
            const isActive = index === activeIndex
            const isPrevious = index === previousIndex
            const reviewClasses = [
              isActive ? styles.activeReview : undefined,
              isActive ? currentAnimationClass : undefined,
              isPrevious ? styles.previousReview : undefined,
              isPrevious ? previousAnimationClass : undefined,
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <ReviewContent
                className={reviewClasses}
                isActive={isActive}
                key={review.id}
                onAnimationEnd={
                  isActive && isTransitioning
                    ? () => setPreviousIndex(null)
                    : undefined
                }
                review={review}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
