const defaultClassName = 'animate-number'

export default ({ el, start = 0, end = 0, duration = 1_000, className = defaultClassName }) => {
  return new Promise((resolve, reject) => {
    let startTimestamp = null

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)

      el.innerText = Math.floor(progress * (end - start) + start)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        el.classList.remove(className)
        resolve()
      }
    }

    el.classList.add(className)
    requestAnimationFrame(step)
  })
}
