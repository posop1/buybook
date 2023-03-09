export interface IBook {
  _id: string
  title: string
  description: string
  author: string
  imgUrl: string
  rating: number
  views: number
  price: number
  genres: string[]
  comments: string[]
  createdAt: Date
  updatedAt: Date
  __v: number
}

export interface IComment {
  postId: string
  comment: string
}

export interface IFetchBooks {
  books: IBook[]
  totalPage: number
  currentPage: number
}
