import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoute from './routes/auth'
import commentRoute from './routes/comments'
import bookRoute from './routes/book'
import genreRoute from './routes/genres'

const app = express()

dotenv.config()

//Constants
const PORT = process.env.PORT || 3000
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/auth', authRoute)
app.use('/api/book', bookRoute)
app.use('/api/comments', commentRoute)
app.use('/api/genre', genreRoute)

const connectDataBase = async () => {
  try {
    mongoose.set('strictQuery', false)
    mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.k0aofua.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    )
    console.log('Connecting to DataBase')
  } catch (error) {
    console.log(error)
  }
}

mongoose.connection.on('disconnected', () => {
  console.log('mongoDB disconnected')
})
mongoose.connection.on('connected', () => {
  console.log('mongoDB connected')
})

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`)
      connectDataBase()
    })
  } catch (error) {
    console.log(error)
  }
}

start()
