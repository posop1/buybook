import { Router } from 'express'
import { createComment } from '../controllers/comments'
import { checkAuth } from '../utils/checkAuth'

const router = Router()

router.post('/', checkAuth, createComment)

export default router
