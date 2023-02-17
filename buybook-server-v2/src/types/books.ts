export interface IBookReq {
  title: string
  description: string
  author: string
  imgUrl: string
  rating: number
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
