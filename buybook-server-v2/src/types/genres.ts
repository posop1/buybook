export interface IAllGenreQuery {
  limit: number
}
export interface IBookByGenreQuery extends IAllGenreQuery {
  page: number
  sortQuery: string
}

export interface IGenreBody {
  name: string
}

export interface IGenreParams {
  id: string
}
