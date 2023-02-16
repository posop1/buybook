import { Router } from 'express'
import { checkAuth } from '../utils/checkAuth.js'
import { getMe, login, register } from '../controllers/auth.js'

const router = new Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', checkAuth, getMe)

export default router
