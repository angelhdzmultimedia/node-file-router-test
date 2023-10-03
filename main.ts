import * as http from 'node:http'
import { initFileRouter } from 'node-file-router'

declare module 'http' {
  interface IncomingMessage {
    body: any
  }
}

function parseJson(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  callback: () => any
) {
  let body: any = []
  req.body = null

  req.on('data', (chunk) => {
    body.push(chunk)
  })

  req.on('end', () => {
    //res.setHeader('Content-Type', 'application/json')
    req.body = Buffer.concat(body).toString()
    callback()
  })
}

async function run() {
  const useFileRouter = await initFileRouter()

  const server = http.createServer(
    (req: http.IncomingMessage, res: http.ServerResponse) => {
      parseJson(req, res, () => {
        useFileRouter(req, res)
      })
    }
  )

  const port = 5000
  server.listen(port, () =>
    console.log(`Server running at http://localhost:${port}/`)
  )
}

run()
