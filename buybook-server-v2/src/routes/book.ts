import { Router } from 'express'
import {
  addFavoriteBook,
  createBook,
  getAll,
  getBookById,
  getBookComments,
  getFavoriteBook,
  removeBook
} from '../controllers/book'
import { checkAuth } from '../utils/checkAuth'

const router = Router()

router.post('/', createBook)
router.get('/', getAll)
router.get('/:id', getBookById)
router.delete('/:id', removeBook)
router.get('/:id/comments', getBookComments)
router.get('/user/favorite', checkAuth, getFavoriteBook)
router.post('/user/favorite/:id', checkAuth, addFavoriteBook)

export default router
