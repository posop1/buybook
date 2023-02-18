import mongoose from 'mongoose'

const GenreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
})

export default mongoose.model('Genre', GenreSchema)
