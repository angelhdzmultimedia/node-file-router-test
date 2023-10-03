import { IncomingMessage, ServerResponse } from 'http'

declare module 'http' {
  interface IncomingMessage {
    body: any
  }
}

export default (req: IncomingMessage, res: ServerResponse) => {
  return res.end(req.body)
}
