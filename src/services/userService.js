import { getMappedUrl, api,GET_PLANETS_BY_SEARCH } from '../common/utils'

export async function fetchPlanets(urlName) {
  const url = getMappedUrl(urlName)
  let jsonResponse
  try {
    jsonResponse = await api(url, { method: 'GET' })
  }
  catch (e) {
    console.log('error on service', e)
  }
  return jsonResponse
}

export async function fetchPlanetDetails(url) {
  let jsonResponse
  try {
    jsonResponse = await api(url, { method: 'GET' })
  }
  catch (e) {
    console.log(e)
  }
  return jsonResponse
}
export async function fetchPlanetsBySearch(searchKey) {
 
  const url = getMappedUrl(GET_PLANETS_BY_SEARCH, [searchKey])
  let jsonResponse
  try {
    jsonResponse = await api(url, { method: 'GET' })
  }
  catch (e) {
    console.log(e)
  }
  return jsonResponse
}