import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    imgUrl: { type: String, required: true },
    rating: { type: Number, required: true },
    views: { type: Number, default: 0 },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Book', BookSchema)
