import { Router } from 'express'
import { createGenre, getAll, removeGenre } from '../controllers/genres.js'

const router = new Router()

router.get('/', getAll)
router.post('/', createGenre)
router.delete('/:id', removeGenre)

export default router
