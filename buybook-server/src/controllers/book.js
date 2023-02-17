import Book from '../models/Book.js'
import Genre from '../models/Genre.js'
import Comment from '../models/Comment.js'
import User from '../models/User.js'

export const createBook = async (req, res) => {
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

export const getAll = async (req, res) => {
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

export const removeBook = async (req, res) => {
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

export const getBookById = async (req, res) => {
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

export const getBookComments = async (req, res) => {
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

export const getBookGenres = async (req, res) => {
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

export const getFavoriteBook = async (req, res) => {
  try {
    const { sortQuery, page = 1, limit = 10 } = req.query
    const user = await User.findById(req.headers.userId)
    const list = await Promise.all(
      user.favoriteBooks.map((book) => {
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
      user.favoriteBooks.map((book) => {
        return Book.findById(book).countDocuments()
      })
    )
    const sumCount = count.reduce((acc, number) => acc + number, 0)

    res.json({ books: list, totalPages: Math.ceil(sumCount / limit), currentPage: page })
  } catch (error) {
    res.status(400).json({ message: 'Что-то пошло не так.' })
  }
}

export const addFavoriteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    await User.findByIdAndUpdate(req.headers.userId, {
      $push: { favoriteBooks: book }
    })

    res.json(book)
  } catch (error) {
    res.status(400).json({ message: 'Что-то пошло не так.' })
  }
}
