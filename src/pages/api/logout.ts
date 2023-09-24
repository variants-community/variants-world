import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  const headers = new Headers()
  // headers.set("Set-Cookie", `sbat=${data.session.access_token}; Path=/;`)
  return new Response(JSON.stringify({ message: 'ok' }), {
    status: 200,
    headers
  })
}
