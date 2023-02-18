import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayload } from '../types/common'

export const checkAuth: RequestHandler = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (token) {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET not found')
      }
      const { id } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload

      req.headers.userId = id

      next()
    } catch (error) {
      return res.status(400).json({
        message: 'Нет доступа.'
      })
    }
  } else {
    return res.status(400).json({
      message: 'Нет доступа.'
    })
  }
}
