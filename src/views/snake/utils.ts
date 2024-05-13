export function rndColor() {
  const r = parseInt(Math.random() * 256 + '')
  const g = parseInt(Math.random() * 256 + '')
  const b = parseInt(Math.random() * 256 + '')
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}
