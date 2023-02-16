import Book from '../models/Book.js'
import Genre from '../models/Genre.js'

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
    const books = await Book.find().sort('-createdAt')

    if (!books) {
      return res.status(404).json({ message: 'Книг нет' })
    }

    res.status(200).json(books)
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
    res.status(400).json({ message: 'error' })
  }
}
