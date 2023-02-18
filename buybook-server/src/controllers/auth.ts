import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { Request, Response } from 'express'
import { ILoginReq } from '../types/auth'

// Register user
export const register = async (req: Request<never, never, ILoginReq>, res: Response) => {
  try {
    const { username, password } = req.body

    const isUsed = await User.findOne({ username })

    if (isUsed) {
      return res.status(400).json({
        message: 'Данный Имя уже занято.'
      })
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = new User({
      username,
      password: hash
    })

    const token = jwt.sign(
      {
        id: newUser._id
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '30d' }
    )

    await newUser.save()

    res.json({
      newUser,
      token,
      message: 'Регистрация прошла успешно.'
    })
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при создании пользователя.' })
  }
}

// Login user
export const login = async (req: Request<never, never, ILoginReq>, res: Response) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(400).json({
        message: 'Такого юзера не существует.'
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: 'Неверный пароль.'
      })
    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '30d' }
    )

    res.json({
      token,
      user,
      message: 'Вы вошли в систему.'
    })
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при авторизации.' })
  }
}

// Get Me
export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.headers.userId)

    if (!user) {
      return res.status(400).json({
        message: 'Такого юзера не существует.'
      })
    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '30d' }
    )

    res.json({
      user,
      token
    })
  } catch (error) {
    res.status(400).json({ message: 'Нет доступа.' })
  }
}
