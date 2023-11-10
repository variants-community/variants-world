import parser from 'ua-parser-js'

export const states = new Map<string, { codeVerifier: string; codeChallenge: string }>()

export const getMetadata = (req: Request) => {
  const ua = req.headers.get('user-agent')
  if (!ua) return 'Unknown device'
  const agent = parser(ua)
  return `${agent.browser.name} ${agent.browser.version}, ${agent.os.name} ${agent.os.version}`
}

export const getLocation = async (ip: string) => {
  if (ip.startsWith('::')) ip = ''
  const location = await (await fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`)).json()
  return `${location.geoplugin_city}, ${location.geoplugin_countryName}`
}

export { ulid } from 'ulidx'
