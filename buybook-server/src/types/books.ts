export interface IBookBody {
  title: string
  description: string
  author: string
  imgUrl: string
  rating: number
  price: number
  genres: string[]
}

export interface IBookQuery {
  sortQuery: string
  page: number
  limit: number
}

export interface IBookParams {
  id: string
}
