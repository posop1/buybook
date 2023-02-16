import Comment from '../models/Comment.js'
import Book from '../models/Book.js'

export const createComment = async (req, res) => {
  try {
    const { bookId, comment } = req.body

    if (!comment) return res.json({ message: 'Комментарий не может быть пустым' })

    const newComment = new Comment({ comment })
    await newComment.save()

    try {
      await Book.findByIdAndUpdate(bookId, {
        $push: { comments: newComment._id }
      })
    } catch (error) {
      console.log(error)
    }

    res.status(200).json(newComment)
  } catch (error) {
    res.status(400).json({ message: 'Что-то пошло не так.' })
  }
}
