import { IncomingMessage, ServerResponse } from 'http'

const Page = (options?: any) => `
<!DOCTYPE html>
  <html>
  <head>
  <title>${options?.title}</title>
  <style>
  * { 
    font-family: sans-serif;
  }
  </style>
  </head>
  
  <body>

  <button onClick="navigateTo('/')">HOME</button>
  ${options?.body ?? ''}
  <script>
  ${options?.imports ?? ''}

  function navigateTo(path) {
    window.location.href = path
  }

  ${options?.script ?? ''}
  </script>
  </body>
  </html>
`

const LoginPage = Page({
  title: 'Login',
  script: `
  globalThis.email = ''
  globalThis.password = ''

  async function handleLoginButtonClick(event) {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: globalThis.email,
          password: globalThis.password,
        })
      })

      const data = await res.json()
      alert(data.email)
  }

 

    
  Array.from(document.querySelectorAll('input'))
  .forEach(item => {
    
    if (!item.getAttribute('v-model')) {
      return
    }

   
    
    item.addEventListener('change', (event) => {
      const key = event.target.getAttribute('v-model')
      
      globalThis[key] = event.target.value
    })

    item.addEventListener('input', (event) => {
      const key = event.target.getAttribute('v-model')
      globalThis[key] = event.target.value
    })
  })
  
  `,
  body: `
<h1>Login</h1>
<input v-model="email" placeholder="Email">
<input v-model="password" placeholder="Password" type="password">
<button onClick="handleLoginButtonClick()">LOGIN</button>
`,
})

const IndexPage = Page({
  title: 'Index',
  body: `
<h1>Index</h1>
<button onClick="navigateTo('/login')">LOGIN</button>
`,
})

const pages: any = {
  '/login': LoginPage,
  '/': IndexPage,
}

export default (req: IncomingMessage, res: ServerResponse) => {
  const page: string = pages[req.url as any] ?? ''
  return res.end(page)
}
