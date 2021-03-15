import { NextFunction, Request, Response } from "express"

const error = () => (err: Error, req: Request, res: Response, next: NextFunction) => {
  switch (err.name) {
    case 'ValidationError':
      res.status(400)
      break
    default:
      res.status(500)
  }
  console.error(err.message || err.name, err)
  return res.send({ error: err.message })
}

export default error
