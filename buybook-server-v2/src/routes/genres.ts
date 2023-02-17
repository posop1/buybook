import { Router } from 'express'
import { createGenre, getAllGenres, getBookByGenre, removeGenre } from '../controllers/genres'

const router = Router()

router.get('/', getAllGenres)
router.post('/', createGenre)
router.delete('/:id', removeGenre)
router.get('/:id', getBookByGenre)

export default router
