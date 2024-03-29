export interface IMovie {
  id: number
  tmdb_id: number,
  title: string
  original_title: string,
  poster_path: string
  backdrop_path: string
  release_date: string
  release_year: string,
  overview: string,
  runtime: string,
  character?: string,
  vote_average: number,
  certification: string,
  tagline: string
  department?: string,
  job?: string,
  clips: IClip[]
  genres: IGenre[]
  writers: string[]
  directors: IPerson[]
  persons: IPerson[]
}

export interface IPerson {
  id: number,
  tmdb_id: number,
  job: string,
  name?: string
  profile_path: string
  character: string
  birthday?: string,
  deathday?: string,
  movies?: IMovie[],
  biography: string,
  movie_credits?: IMovie[],
  person: {
    name: string
    profile_path: string
  }
}

export interface IGenre {
  id: number,
  name: string
}

export interface IClip {
  name: string,
  key: string,
  site: string,
  type: string,
  official: boolean,
  id: number,
  published_at: string
}
