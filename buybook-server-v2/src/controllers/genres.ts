import Genre from '../models/Genre'
import Book from '../models/Book'
import { Request, Response } from 'express'
import { IGenreBody, IGenreParams, IAllGenreQuery, IBookByGenreQuery } from '../types/genres'

export const getAllGenres = async (
  req: Request<never, never, never, IAllGenreQuery>,
  res: Response
) => {
  try {
    const { limit } = req.query
    const genres = await Genre.find()
      .limit(limit * 1)
      .exec()

    if (!genres) {
      return res.status(400).json({ message: 'Жанров нет' })
    }

    res.status(200).json(genres)
  } catch (error) {
    res.status(400).json({ message: 'Что-то пошло не так.' })
  }
}

export const createGenre = async (req: Request<never, never, IGenreBody>, res: Response) => {
  try {
    const { name } = req.body

    const newGenre = new Genre({ name })
    await newGenre.save()

    res.json({ message: 'Жанр создан' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Что-то пошло не так.' })
  }
}

export const removeGenre = async (req: Request<IGenreParams>, res: Response) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id)

    if (!genre) {
      return res.json({ message: 'Такого жанра нет' })
    }

    res.json({ message: 'Жанр удалён' })
  } catch (error) {
    res.status(400).json({ message: 'Что-то пошло не так.' })
  }
}

export const getBookByGenre = async (
  req: Request<IGenreParams, never, never, IBookByGenreQuery>,
  res: Response
) => {
  try {
    const { sortQuery, page = 1, limit = 10 } = req.query
    const genre = await Genre.findById(req.params.id)

    if (!genre) {
      return res.json({ message: 'Такого жанра нет' })
    }

    const list = await Promise.all(
      genre.books.map((book) => {
        return Book.findById(book)
          .sort(sortQuery)
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .exec()
      })
    )

    if (!list) {
      return res.status(404).json({ message: 'Книг нет' })
    }

    const count = await Promise.all(
      genre.books.map((book) => {
        return Book.findById(book).countDocuments()
      })
    )
    const sumCount = count.reduce((acc, number) => acc + number, 0)

    res.json({
      books: list,
      totalPages: Math.ceil(sumCount / limit),
      currentPage: page
    })
  } catch (error) {
    res.status(400).json({ message: 'Что-то пошло не так.' })
  }
}
