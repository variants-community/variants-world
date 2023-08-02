import type { APIRoute } from 'astro'
import { supabase } from '../../db/supabase/supabase'

export const post: APIRoute = async ({ request }) => {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')

  if (!password || !email)
    return new Response(
      JSON.stringify({
        message: 'Missing required fields'
      }),
      { status: 400 }
    )

  const { data, error } = await supabase.auth.signInWithPassword({
    password: password.toString(),
    email: email.toString()
  })

  if (error)
    return new Response(
      JSON.stringify({
        message: 'Authentifiaction error'
      }),
      { status: 401 }
    )
  const headers = new Headers()

  let cookieValue = `sbat=${data.session.access_token}; Path=/`

  if (data.session.expires_at) {
    const expiredTime = new Date()
    expiredTime.setTime(expiredTime.getTime() + data.session.expires_at)
    cookieValue += `; Expires=${expiredTime.toUTCString()}`
  }

  headers.set('Set-Cookie', cookieValue)
  headers.set('url', '/')

  return new Response(JSON.stringify({ message: 'ok' }), {
    status: 200,
    headers: headers
  })
}
