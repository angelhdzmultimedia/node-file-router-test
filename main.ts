import * as http from 'node:http'
import { initFileRouter } from 'node-file-router'

async function run() {
  const useFileRouter = await initFileRouter()

  const server = http.createServer(
    (req: http.IncomingMessage, res: http.ServerResponse) => {
      useFileRouter(req, res)
    }
  )

  const port = 5000
  server.listen(port, () =>
    console.log(`Server running at http://localhost:${port}/`)
  )
}

run()
