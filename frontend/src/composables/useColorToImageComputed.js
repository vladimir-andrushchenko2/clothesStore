import { computed } from 'vue'

export default function useComputedCurrentImgBasedOnColor(colors, currentColorId) {
  return computed(() => {
    // get currently selected color
    const color = colors.find((color) => color.id === currentColorId.value)

    // some colors don't have associated galleries
    if (color.gallery) {
      return color.gallery[0].file.url
    }

    // if selected color has no gallery return first color that has gallery
    return colors.find((color) => color.gallery).gallery[0].file.url
  })
}
