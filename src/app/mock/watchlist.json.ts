export interface IMovie {
  id: number
  tmdb_id: number,
  title: string
  original_title: string,
  poster_path: string
  backdrop_path: string
  release_date: string
  release_year: string,
  overview: string
  runtime: string,
  vote_average: number,
  certification: string,
  tagline: string
  clips: IClip[]
  genres: IGenre[]
  writers: string[]
  directors: IPerson[]
  persons: IPerson[]
}

export interface IPerson {
  job: string,
  name?: string
  profile_path: string
  character: string
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

export const watchlist: IMovie[] = [
  {
    title: "Moonrise Kingdom",
    original_title: "Moonrise Kingdom",
    poster_path: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xrziXRHRQ7c7YLIehgSJY8GQBsx.jpg",
    backdrop_path: "https://www.themoviedb.org/t/p/original/xwrYBIt2BV1KlPRaAOLPmUqM6p3.jpg",
    release_date: "05-25-2012",
    release_year: '2012',
    overview: 'Set on an island off the coast of New England in the summer of 1965, Moonrise Kingdom tells the story of two twelve-year-olds who fall in love, make a secret pact, and run away together into the wilderness. As various authorities try to hunt them down, a violent storm is brewing off-shore – and the peaceful island community is turned upside down in more ways than anyone can handle.',
    tagline: 'A tormenting and surprising story of children and adults during the stormy days of the summer of 1965.',
    id: 1,
    tmdb_id: 693134,
    certification: '15',
    clips: [{ id: 1, name: 'asd', site: 'YouTube', type: 'trailer', official: true, published_at: '', key: 'RBCRe73dZb0' }],
    genres: [{id: 1, name: 'adventure'}],
    writers: ['Wes Anderson', 'Roman Coppola'],
    persons: [{character: '', profile_path: '', job: '', person: {profile_path: '', name: 'Jan de vries'}}],
    directors: [{character: '', profile_path: '', job: '', person: {profile_path: '', name: 'Jan de vries'}}],
    runtime: '1h34m',
    vote_average: 5,
  },
  {
    title: "Oppenheimer",
    original_title: "Moonrise Kingdom",
    poster_path: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop_path: 'https://www.themoviedb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg',
    release_date: "07-21-2023",
    release_year: '2023',
    overview: 'The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.',
    tagline: 'The world forever changes.',
    id: 2,
    tmdb_id: 693134,
    certification: '15',
    clips: [{ id: 1, name: 'asd', site: 'YouTube', type: 'trailer', official: true, published_at: '', key: 'RBCRe73dZb0' }],
    genres: [{id: 1, name: 'adventure'}],
    writers: ['Christopher Nolan'],
    persons: [{character: '', profile_path: '', job: '', person: {profile_path: '', name: 'Jan de vries'}}],
    directors: [{character: '', profile_path: '', job: '', person: {profile_path: '', name: 'Jan de vries'}}],
    runtime: '3h1m',
    vote_average: 5
  },
]
