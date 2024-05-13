export default function animateScroll() {
  const observer = new IntersectionObserver((entries) => {
    // 遍历观察到的元素
    entries.forEach((entry) => {
      // 如果元素可见
      if (entry.isIntersecting) {
        console.log('hello')
        // 执行你的操作
        entry.target.classList.add('animate__lightSpeedInLeft')
      } else {
        entry.target.classList.remove('animate__lightSpeedInLeft')
      }
    })
  })

  const hiddenElement = document.querySelectorAll('.animate__animated')
  hiddenElement.forEach((element) => {
    observer.observe(element)
  })
}
