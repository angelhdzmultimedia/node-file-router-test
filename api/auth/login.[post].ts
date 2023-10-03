import { IncomingMessage, ServerResponse } from 'http'

export default (req: IncomingMessage, res: ServerResponse) => {
  let body: any = []

  req.on('data', (chunk) => {
    body.push(chunk)
  })

  req.on('end', () => {
    res.setHeader('Content-Type', 'application/json')
    res.end(Buffer.concat(body).toString())
  })
}
