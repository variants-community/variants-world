import { useEffect, useState } from 'preact/hooks'

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (isLogin) window.location.replace('/')
  }, [isLogin])

  const submit = async (e: Event) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const response = await fetch('/api/login', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    if (response.status === 200) {
      setIsLogin(true)
    }
    console.log('response: ', data)
  }

  return (
    <form onSubmit={submit} class="w-[300px] flex flex-col gap-2 mt-5">
      <div class="flex flex-row justify-between">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="text" class="w-[200px] bg-dark border border-text rounded outline-none" />
      </div>

      <div class="flex flex-row justify-between">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" class="w-[200px] bg-dark border border-text rounded outline-none" />
      </div>
      <div class="flex justify-end">
        <button class="border border-gray-800 px-2 rounded">login</button>
      </div>
    </form>
  )
}

export default LoginForm
