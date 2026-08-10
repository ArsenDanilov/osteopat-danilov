import { useEffect, useRef, useState, type MouseEvent } from 'react'
import biodynamicsPhaseOne from '../../assets/documents/biodynamics-phase-1-2016.jpg'
import birsteinStillness from '../../assets/documents/birstein-stillness-2017.jpg'
import chikurov from '../../assets/documents/chikurov-2019.jpg'
import craniosacralTherapy from '../../assets/documents/craniosacraltherapy-2016.jpg'
import jealousBiodynamics from '../../assets/documents/jealous2016.jpg'
import osteopathyDiploma from '../../assets/documents/osteopathy-diploma-2016.jpg'
import qualification2015 from '../../assets/documents/povish_kvalif2015.jpg'
import qualification2016 from '../../assets/documents/povish_kvalif2016_2.jpg'
import upledgerLevelOne from '../../assets/documents/upledger-cst-1-2014.jpg'
import upledgerLevelTwo from '../../assets/documents/upledger-cst-2-2015.jpg'
import {
  DocumentLightbox,
  type LightboxDocument,
} from '../../components/DocumentLightbox/DocumentLightbox'
import styles from './Education.module.css'

interface EducationDocument extends LightboxDocument {
  id: string
  institution: string
}

const documents = [
  {
    id: 'osteopathy-diploma',
    image: osteopathyDiploma,
    institution: 'СЗГМУ им. И. И. Мечникова',
    title: 'Диплом о профессиональной переподготовке по остеопатии',
    alt: 'Диплом о профессиональной переподготовке по остеопатии',
    width: 1280,
    height: 930,
  },
  {
    id: 'upledger-level-one',
    image: upledgerLevelOne,
    institution: 'The Upledger Institute, Inc.',
    title: 'CranioSacral Therapy Level I',
    alt: 'Сертификат CranioSacral Therapy Level I',
    width: 1280,
    height: 931,
  },
  {
    id: 'qualification-2015',
    image: qualification2015,
    institution: 'СЗГМУ им. И. И. Мечникова',
    title: 'Удостоверение о повышении квалификации по остеопатии',
    alt: 'Удостоверение о повышении квалификации по остеопатии',
    width: 1280,
    height: 931,
  },
  {
    id: 'jealous-biodynamics',
    image: jealousBiodynamics,
    institution: 'James Jealous · Igor Litvinov',
    title: 'A Biodynamics View of Osteopathy in the Cranial Field, Phase I',
    alt: 'Сертификат по биодинамическому подходу в остеопатии, Phase I',
    width: 1280,
    height: 931,
  },
  {
    id: 'craniosacral-therapy-one',
    image: craniosacralTherapy,
    institution: 'Институт клинической прикладной кинезиологии',
    title: 'Краниосакральная терапия — 1 (CS1)',
    alt: 'Удостоверение по программе «Краниосакральная терапия — 1»',
    width: 1280,
    height: 931,
  },
  {
    id: 'biodynamics-phase-one',
    image: biodynamicsPhaseOne,
    institution: 'Институт остеопатии',
    title: 'Биодинамическая остеопатия. Фаза-1',
    alt: 'Удостоверение по программе «Биодинамическая остеопатия. Фаза-1»',
    width: 1280,
    height: 931,
  },
  {
    id: 'upledger-level-two',
    image: upledgerLevelTwo,
    institution: 'The Upledger Institute, Inc.',
    title: 'CranioSacral Therapy 2 (CS2)',
    alt: 'Сертификат CranioSacral Therapy 2',
    width: 1280,
    height: 931,
  },
  {
    id: 'craniosacral-therapy-two',
    image: qualification2016,
    institution: 'Институт клинической прикладной кинезиологии',
    title: 'Краниосакральная терапия — 2 (CS2)',
    alt: 'Удостоверение по программе «Краниосакральная терапия — 2»',
    width: 1280,
    height: 931,
  },
  {
    id: 'birstein-stillness',
    image: birsteinStillness,
    institution: 'Emmanuel R. Birstein',
    title: 'The Key to the Depths of Stillness, Phase I',
    alt: 'Сертификат The Key to the Depths of Stillness, Phase I',
    width: 1280,
    height: 931,
  },
  {
    id: 'chikurov-centering',
    image: chikurov,
    institution: 'Школа доктора Чикурова',
    title: 'Биологическое центрирование. Постановка перцепции',
    alt: 'Сертификат семинара «Биологическое центрирование. Постановка перцепции»',
    width: 905,
    height: 1280,
  },
] satisfies readonly EducationDocument[]

export function Education() {
  const [selectedDocument, setSelectedDocument] =
    useState<EducationDocument | null>(null)
  const [canScrollPrevious, setCanScrollPrevious] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)
  const sliderRef = useRef<HTMLUListElement>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const slider = sliderRef.current

    if (!slider) return

    const updateControls = () => {
      const maximumScroll = slider.scrollWidth - slider.clientWidth
      const edgeTolerance = 8

      setCanScrollPrevious(slider.scrollLeft > edgeTolerance)
      setCanScrollNext(slider.scrollLeft < maximumScroll - edgeTolerance)
    }

    updateControls()
    slider.addEventListener('scroll', updateControls, { passive: true })
    window.addEventListener('resize', updateControls)

    return () => {
      slider.removeEventListener('scroll', updateControls)
      window.removeEventListener('resize', updateControls)
    }
  }, [])

  function scrollToAdjacentDocument(direction: -1 | 1) {
    const slider = sliderRef.current

    if (!slider) return

    const slides = Array.from(slider.children) as HTMLElement[]
    const sliderLeft = slider.getBoundingClientRect().left
    const positions = slides.map(
      (slide) =>
        slide.getBoundingClientRect().left - sliderLeft + slider.scrollLeft,
    )
    const currentIndex = positions.reduce((closestIndex, position, index) => {
      const currentDistance = Math.abs(position - slider.scrollLeft)
      const closestDistance = Math.abs(
        positions[closestIndex] - slider.scrollLeft,
      )

      return currentDistance < closestDistance ? index : closestIndex
    }, 0)
    const targetIndex = Math.min(
      slides.length - 1,
      Math.max(0, currentIndex + direction),
    )

    slider.scrollTo({ behavior: 'smooth', left: positions[targetIndex] })
  }

  function openDocument(
    item: EducationDocument,
    event: MouseEvent<HTMLButtonElement>,
  ) {
    lastTriggerRef.current = event.currentTarget
    setSelectedDocument(item)
  }

  function closeDocument() {
    setSelectedDocument(null)
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus())
  }

  return (
    <section
      aria-labelledby="education-title"
      className={styles.education}
      id="education"
    >
      <div className="container">
        <div className={styles.headingRow}>
          <h2 className={styles.title} id="education-title">
            Дипломы и сертификаты
          </h2>

          <div
            aria-label="Навигация по документам"
            className={styles.controls}
            role="group"
          >
            <button
              aria-label="Предыдущий документ"
              className={styles.controlButton}
              disabled={!canScrollPrevious}
              onClick={() => scrollToAdjacentDocument(-1)}
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
              aria-label="Следующий документ"
              className={styles.controlButton}
              disabled={!canScrollNext}
              onClick={() => scrollToAdjacentDocument(1)}
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

        <ul className={styles.slider} ref={sliderRef}>
          {documents.map((item) => (
            <li className={styles.slide} key={item.id}>
              <button
                aria-label={`Открыть документ: ${item.title}`}
                className={styles.documentButton}
                onClick={(event) => openDocument(item, event)}
                type="button"
              >
                <span className={styles.previewFrame}>
                  <img
                    alt={item.alt}
                    className={styles.previewImage}
                    decoding="async"
                    height={item.height}
                    loading="lazy"
                    src={item.image}
                    width={item.width}
                  />
                </span>
                <span className={styles.caption}>{item.institution}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <DocumentLightbox item={selectedDocument} onClose={closeDocument} />
    </section>
  )
}
