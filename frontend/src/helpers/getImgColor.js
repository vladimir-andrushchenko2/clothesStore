export default function getImgOfColor(item, colorIdRef) {
  // get currently selected color
  const color = item.colors.find((color) => color.id === colorIdRef.value)

  // if selected color has no gallery return first color that has gallery
  const altOutput = item.colors.find((color) => color.url)
  return color?.url ?? altOutput.url
}
