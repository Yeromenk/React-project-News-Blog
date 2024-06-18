import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import postRoutes from './routes/posts.js'
import commentRoutes from './routes/comment.js'

const app = express()

app.use(cors()) // Add this line
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

app.listen(3001, () => {
    console.log('Server is running on port 3001')
})
