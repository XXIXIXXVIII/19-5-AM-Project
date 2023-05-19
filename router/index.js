import express from 'express'
import userRouter from './user.router.js'
import postRouter from './post.router.js'

const router = express.Router()

router.use('/user',userRouter)

router.use('/api/v1/users',postRouter)

export default router