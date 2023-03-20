export default function parseArrayAsParameter(name, valuesArr) {
  return valuesArr.map((val) => `${name}[]=${val}`).join('&')
}
