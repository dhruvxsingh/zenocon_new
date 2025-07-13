export type AnimationVariant =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "zoomIn"
  | "slideInLeft"
  | "slideInRight"
  | "pulse"
  | "float"

export const getAnimationClass = (animation: AnimationVariant, delay = 0): string => {
  const delayClass = delay > 0 ? ` animation-delay-${delay}` : ""

  switch (animation) {
    case "fadeIn":
      return `animate-fadeIn${delayClass}`
    case "fadeInUp":
      return `animate-fadeInUp${delayClass}`
    case "fadeInDown":
      return `animate-fadeInDown${delayClass}`
    case "fadeInLeft":
      return `animate-fadeInLeft${delayClass}`
    case "fadeInRight":
      return `animate-fadeInRight${delayClass}`
    case "zoomIn":
      return `animate-zoomIn${delayClass}`
    case "slideInLeft":
      return `animate-slideInLeft${delayClass}`
    case "slideInRight":
      return `animate-slideInRight${delayClass}`
    case "pulse":
      return `animate-pulse${delayClass}`
    case "float":
      return `animate-float${delayClass}`
    default:
      return ""
  }
}
