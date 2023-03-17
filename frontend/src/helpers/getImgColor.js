export default function getImgOfColor(item, colorIdRef) {
  // get currently selected color
  const color = item.colors.find((color) => color.id === colorIdRef.value)

  // some colors don't have associated galleries
  if (color.gallery) {
    return color.gallery[0].file.url
  }

  // if selected color has no gallery return first color that has gallery
  return item.colors.find((color) => color.gallery).gallery[0].file.url
}
