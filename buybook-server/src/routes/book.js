import { Router } from 'express'
import { checkAuth } from '../utils/checkAuth.js'
import { createBook, getAll, removeBook } from '../controllers/book.js'

const router = new Router()

router.post('/', createBook)
router.get('/', getAll)
router.delete('/:id', removeBook)

//TODO: Сделать выдачу книги по id
//TODO: Выдача книги по жанру
//TODO: Популярные книги

export default router
