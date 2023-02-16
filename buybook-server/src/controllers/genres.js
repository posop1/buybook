import Genre from '../models/Genre.js'

export const getAll = async (req, res) => {
  try {
    const genres = await Genre.find()

    if (!genres) {
      return res.status(400).json({ message: 'Жанров нет' })
    }

    res.status(200).json(genres)
  } catch (error) {
    res.status(400).json({ message: 'Что-то пошло не так.' })
  }
}

export const createGenre = async (req, res) => {
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

export const removeGenre = async (req, res) => {
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
