let activeLocks = 0
let previousRootOverflow = ''

export function lockPageScroll() {
  const root = document.documentElement

  if (activeLocks === 0) {
    previousRootOverflow = root.style.overflow
    root.style.overflow = 'hidden'
  }

  activeLocks += 1
  let isReleased = false

  return () => {
    if (isReleased) return

    isReleased = true
    activeLocks = Math.max(0, activeLocks - 1)

    if (activeLocks === 0) {
      root.style.overflow = previousRootOverflow
    }
  }
}
