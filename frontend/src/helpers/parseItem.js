export default function parseItem(item) {
  const output = JSON.parse(JSON.stringify(item))

  output.colors = output.colors.map((colorObj) => {
    const { color, gallery } = colorObj;
    const { code, id, title } = color
    const url = gallery?.at(0).file.url

    return {
      id, code, title, url
    }
  })

  return output
}
