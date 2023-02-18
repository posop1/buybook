import Book from '../models/Book'
import Genre from '../models/Genre'
import Comment from '../models/Comment'
import User from '../models/User'
import { Request, Response } from 'express'
import { IBookParams, IBookQuery, IBookBody } from '../types/books.js'

export const createBook = async (req: Request<never, never, IBookBody>, res: Response) => {
  try {
    const { title, description, author, imgUrl, rating, genres } = req.body

    const newBook = new Book({
      title,
      description,
      author,
      imgUrl,
      rating,
      genres
    })

    await newBook.save()
    await Genre.findByIdAndUpdate(genres, {
      $push: { books: newBook }
    })

    res.status(200).json(newBook)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Что-то пошло не так.' })
  }
}

export const getAll = async (req: Request<never, never, never, IBookQuery>, res: Response) => {
  try {
    const { sortQuery, page = 1, limit = 10 } = req.query
    const books = await Book.find()
      .sort(sortQuery)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await Book.countDocuments()

    if (!books) {
      return res.status(404).json({ message: 'Книг нет' })
    }

    res.status(200).json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    })
  } catch (error) {
    res.status(400).json({ message: 'Что-то пошло не так.' })
  }
}

export const removeBook = async (req: Request<IBookParams>, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)

    if (!book) {
      return res.status(400).json({ message: 'Такой книги нет' })
    }

    res.json({ message: 'Книга удалена' })
  } catch (error) {
    res.status(400).json({ message: 'Что-то пошло не так.' })
  }
}

export const getBookById = async (req: Request<IBookParams>, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 }
    })

    if (!book) {
      return res.status(400).json({ message: 'Такой книги нет' })
    }

    res.status(200).json(book)
  } catch (error) {
    res.status(400).json({ message: 'Что-то пошло не так.' })
  }
}

export const getBookComments = async (req: Request<IBookParams>, res: Response) => {
  try {
    const book = await Book.findById(req.params.id)

    if (!book) {
      return res.status(400).json({ message: 'Такой книги нет' })
    }

    const list = await Promise.all(
      book.comments.map((comment) => {
        return Comment.findById(comment)
      })
    )

    res.json(list)
  } catch (error) {
    res.status(400).json({ message: 'Что-то пошло не так.' })
  }
}

export const getBookGenres = async (req: Request<IBookParams>, res: Response) => {
  try {
    const book = await Book.findById(req.params.id)

    if (!book) {
      return res.status(400).json({ message: 'Такой книги нет' })
    }

    const list = await Promise.all(
      book.genres.map((genre) => {
        return Genre.findById(genre)
      })
    )

    res.json(list)
  } catch (error) {
    res.status(400).json({ message: 'Что-то пошло не так.' })
  }
}

export const getFavoriteBook = async (req: Request, res: Response) => {
  try {
    const { sortQuery, page = 1, limit = 10 } = req.query
    const user = await User.findById(req.headers.userId)

    if (!user) {
      return res.status(404).json({ message: 'Пользовательно не найден' })
    }

    const list = await Promise.all(
      user.favoriteBooks.map((book) => {
        return Book.findById(book)
          .sort(String(sortQuery))
          .limit(Number(limit) * 1)
          .skip((Number(page) - 1) * Number(limit))
          .exec()
      })
    )

    if (!list) {
      return res.status(404).json({ message: 'Книг нет' })
    }

    const count = await Promise.all(
      user.favoriteBooks.map((book) => {
        return Book.findById(book).countDocuments()
      })
    )
    const sumCount = count.reduce((acc, number) => acc + number, 0)

    res.json({ books: list, totalPages: Math.ceil(sumCount / Number(limit)), currentPage: page })
  } catch (error) {
    res.status(400).json({ message: 'Что-то пошло не так.' })
  }
}

export const addFavoriteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id)

    if (!book) {
      return res.status(404).json({ message: 'Такой книги нет' })
    }

    await User.findByIdAndUpdate(req.headers.userId, {
      $push: { favoriteBooks: book }
    })

    res.json(book)
  } catch (error) {
    res.status(400).json({ message: 'Что-то пошло не так.' })
  }
}
