import parseArrayAsParameter from './parseArrayAsParameter'
import removeFalsyFromObj from './removeFalsyFromObj'

export default function parseFilterDataInParamsString({ materialIds, seasonIds, ...data }) {
  const params = new URLSearchParams(removeFalsyFromObj(data)).toString()
  const materials = parseArrayAsParameter('materialIds', materialIds)
  const seasons = parseArrayAsParameter('seasonIds', seasonIds)

  return [params, materials, seasons].filter(item => item).join('&')
}
