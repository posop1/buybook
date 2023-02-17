import { Router } from 'express'
import { checkAuth } from '../utils/checkAuth'
import { getMe, login, register } from '../controllers/auth'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', checkAuth, getMe)

export default router
