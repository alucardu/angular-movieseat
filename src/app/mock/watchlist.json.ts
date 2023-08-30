export interface IMovie {
  id: number
  title: string
  poster: string
  release_date: string
  release_year: string,
  overview: string
  runtime: string,
  tag: string
  clips: IClip[]
  tags: string[]
  writers: string[]
  directors: string[]
}

export interface IClip {
  id: string
}

export const watchlist: IMovie[] = [
  {
    title: "Moonrise Kingdom",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xrziXRHRQ7c7YLIehgSJY8GQBsx.jpg",
    release_date: "05-25-2012",
    release_year: '2012',
    overview: 'Set on an island off the coast of New England in the summer of 1965, Moonrise Kingdom tells the story of two twelve-year-olds who fall in love, make a secret pact, and run away together into the wilderness. As various authorities try to hunt them down, a violent storm is brewing off-shore – and the peaceful island community is turned upside down in more ways than anyone can handle.',
    tag: 'A tormenting and surprising story of children and adults during the stormy days of the summer of 1965.',
    id: 1,
    clips: [{ id: 'RBCRe73dZb0' }, { id: 'qtnq_Ffieno' }, { id: '_eOI3AamSm8' }, { id: 'uDph9wSeWvY' }],
    tags: ['Comedy', 'Drama', 'Romance'],
    writers: ['Wes Anderson', 'Roman Coppola'],
    directors: ['Wes Anderson'],
    runtime: '1h34m'
  },
  {
    title: "Oppenheimer",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    release_date: "07-21-2023",
    release_year: '2023',
    overview: 'The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.',
    tag: 'The world forever changes.',
    id: 2,
    clips: [{ id: 'uYPbbksJxIg' }, { id: 'bK6ldnjE3Y0' }, { id: 'sOsIKu2VAkM' }, { id: 'yi363I5MoAk' }],
    tags: ['Thriller', 'Drama', 'Horror'],
    writers: ['Christopher Nolan'],
    directors: ['Christopher Nolan'],
    runtime: '3h1m'
  },
  {
    title: "Oppenheimer",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    release_date: "07-21-2023",
    release_year: '2023',
    overview: 'The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.',
    tag: 'The world forever changes.',
    id: 2,
    clips: [{ id: 'uYPbbksJxIg' }, { id: 'bK6ldnjE3Y0' }, { id: 'sOsIKu2VAkM' }, { id: 'yi363I5MoAk' }],
    tags: ['Thriller', 'Drama', 'Horror'],
    writers: ['Christopher Nolan'],
    directors: ['Christopher Nolan'],
    runtime: '3h1m'
  },
  {
    title: "Moonrise Kingdom",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xrziXRHRQ7c7YLIehgSJY8GQBsx.jpg",
    release_date: "05-25-2012",
    release_year: '2012',
    overview: 'Set on an island off the coast of New England in the summer of 1965, Moonrise Kingdom tells the story of two twelve-year-olds who fall in love, make a secret pact, and run away together into the wilderness. As various authorities try to hunt them down, a violent storm is brewing off-shore – and the peaceful island community is turned upside down in more ways than anyone can handle.',
    tag: 'A tormenting and surprising story of children and adults during the stormy days of the summer of 1965.',
    id: 1,
    clips: [{ id: 'RBCRe73dZb0' }, { id: 'qtnq_Ffieno' }, { id: '_eOI3AamSm8' }, { id: 'uDph9wSeWvY' }],
    tags: ['Comedy', 'Drama', 'Romance'],
    writers: ['Wes Anderson', 'Roman Coppola'],
    directors: ['Wes Anderson'],
    runtime: '1h34m'
  },
  {
    title: "Moonrise Kingdom",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xrziXRHRQ7c7YLIehgSJY8GQBsx.jpg",
    release_date: "05-25-2012",
    release_year: '2012',
    overview: 'Set on an island off the coast of New England in the summer of 1965, Moonrise Kingdom tells the story of two twelve-year-olds who fall in love, make a secret pact, and run away together into the wilderness. As various authorities try to hunt them down, a violent storm is brewing off-shore – and the peaceful island community is turned upside down in more ways than anyone can handle.',
    tag: 'A tormenting and surprising story of children and adults during the stormy days of the summer of 1965.',
    id: 1,
    clips: [{ id: 'RBCRe73dZb0' }, { id: 'qtnq_Ffieno' }, { id: '_eOI3AamSm8' }, { id: 'uDph9wSeWvY' }],
    tags: ['Comedy', 'Drama', 'Romance'],
    writers: ['Wes Anderson', 'Roman Coppola'],
    directors: ['Wes Anderson'],
    runtime: '1h34m'
  },
  {
    title: "Oppenheimer",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    release_date: "07-21-2023",
    release_year: '2023',
    overview: 'The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.',
    tag: 'The world forever changes.',
    id: 2,
    clips: [{ id: 'uYPbbksJxIg' }, { id: 'bK6ldnjE3Y0' }, { id: 'sOsIKu2VAkM' }, { id: 'yi363I5MoAk' }],
    tags: ['Thriller', 'Drama', 'Horror'],
    writers: ['Christopher Nolan'],
    directors: ['Christopher Nolan'],
    runtime: '3h1m'
  },
  {
    title: "Oppenheimer",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    release_date: "07-21-2023",
    release_year: '2023',
    overview: 'The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.',
    tag: 'The world forever changes.',
    id: 2,
    clips: [{ id: 'uYPbbksJxIg' }, { id: 'bK6ldnjE3Y0' }, { id: 'sOsIKu2VAkM' }, { id: 'yi363I5MoAk' }],
    tags: ['Thriller', 'Drama', 'Horror'],
    writers: ['Christopher Nolan'],
    directors: ['Christopher Nolan'],
    runtime: '3h1m'
  },
  {
    title: "Moonrise Kingdom",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xrziXRHRQ7c7YLIehgSJY8GQBsx.jpg",
    release_date: "05-25-2012",
    release_year: '2012',
    overview: 'Set on an island off the coast of New England in the summer of 1965, Moonrise Kingdom tells the story of two twelve-year-olds who fall in love, make a secret pact, and run away together into the wilderness. As various authorities try to hunt them down, a violent storm is brewing off-shore – and the peaceful island community is turned upside down in more ways than anyone can handle.',
    tag: 'A tormenting and surprising story of children and adults during the stormy days of the summer of 1965.',
    id: 1,
    clips: [{ id: 'RBCRe73dZb0' }, { id: 'qtnq_Ffieno' }, { id: '_eOI3AamSm8' }, { id: 'uDph9wSeWvY' }],
    tags: ['Comedy', 'Drama', 'Romance'],
    writers: ['Wes Anderson', 'Roman Coppola'],
    directors: ['Wes Anderson'],
    runtime: '1h34m'
  },

  {
    title: "Moonrise Kingdom",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xrziXRHRQ7c7YLIehgSJY8GQBsx.jpg",
    release_date: "05-25-2012",
    release_year: '2012',
    overview: 'Set on an island off the coast of New England in the summer of 1965, Moonrise Kingdom tells the story of two twelve-year-olds who fall in love, make a secret pact, and run away together into the wilderness. As various authorities try to hunt them down, a violent storm is brewing off-shore – and the peaceful island community is turned upside down in more ways than anyone can handle.',
    tag: 'A tormenting and surprising story of children and adults during the stormy days of the summer of 1965.',
    id: 1,
    clips: [{ id: 'RBCRe73dZb0' }, { id: 'qtnq_Ffieno' }, { id: '_eOI3AamSm8' }, { id: 'uDph9wSeWvY' }],
    tags: ['Comedy', 'Drama', 'Romance'],
    writers: ['Wes Anderson', 'Roman Coppola'],
    directors: ['Wes Anderson'],
    runtime: '1h34m'
  },
  {
    title: "Oppenheimer",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    release_date: "07-21-2023",
    release_year: '2023',
    overview: 'The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.',
    tag: 'The world forever changes.',
    id: 2,
    clips: [{ id: 'uYPbbksJxIg' }, { id: 'bK6ldnjE3Y0' }, { id: 'sOsIKu2VAkM' }, { id: 'yi363I5MoAk' }],
    tags: ['Thriller', 'Drama', 'Horror'],
    writers: ['Christopher Nolan'],
    directors: ['Christopher Nolan'],
    runtime: '3h1m'
  },
  {
    title: "Oppenheimer",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    release_date: "07-21-2023",
    release_year: '2023',
    overview: 'The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.',
    tag: 'The world forever changes.',
    id: 2,
    clips: [{ id: 'uYPbbksJxIg' }, { id: 'bK6ldnjE3Y0' }, { id: 'sOsIKu2VAkM' }, { id: 'yi363I5MoAk' }],
    tags: ['Thriller', 'Drama', 'Horror'],
    writers: ['Christopher Nolan'],
    directors: ['Christopher Nolan'],
    runtime: '3h1m'
  },
  {
    title: "Moonrise Kingdom",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xrziXRHRQ7c7YLIehgSJY8GQBsx.jpg",
    release_date: "05-25-2012",
    release_year: '2012',
    overview: 'Set on an island off the coast of New England in the summer of 1965, Moonrise Kingdom tells the story of two twelve-year-olds who fall in love, make a secret pact, and run away together into the wilderness. As various authorities try to hunt them down, a violent storm is brewing off-shore – and the peaceful island community is turned upside down in more ways than anyone can handle.',
    tag: 'A tormenting and surprising story of children and adults during the stormy days of the summer of 1965.',
    id: 1,
    clips: [{ id: 'RBCRe73dZb0' }, { id: 'qtnq_Ffieno' }, { id: '_eOI3AamSm8' }, { id: 'uDph9wSeWvY' }],
    tags: ['Comedy', 'Drama', 'Romance'],
    writers: ['Wes Anderson', 'Roman Coppola'],
    directors: ['Wes Anderson'],
    runtime: '1h34m'
  },

  {
    title: "Moonrise Kingdom",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xrziXRHRQ7c7YLIehgSJY8GQBsx.jpg",
    release_date: "05-25-2012",
    release_year: '2012',
    overview: 'Set on an island off the coast of New England in the summer of 1965, Moonrise Kingdom tells the story of two twelve-year-olds who fall in love, make a secret pact, and run away together into the wilderness. As various authorities try to hunt them down, a violent storm is brewing off-shore – and the peaceful island community is turned upside down in more ways than anyone can handle.',
    tag: 'A tormenting and surprising story of children and adults during the stormy days of the summer of 1965.',
    id: 1,
    clips: [{ id: 'RBCRe73dZb0' }, { id: 'qtnq_Ffieno' }, { id: '_eOI3AamSm8' }, { id: 'uDph9wSeWvY' }],
    tags: ['Comedy', 'Drama', 'Romance'],
    writers: ['Wes Anderson', 'Roman Coppola'],
    directors: ['Wes Anderson'],
    runtime: '1h34m'
  },
  {
    title: "Oppenheimer",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    release_date: "07-21-2023",
    release_year: '2023',
    overview: 'The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.',
    tag: 'The world forever changes.',
    id: 2,
    clips: [{ id: 'uYPbbksJxIg' }, { id: 'bK6ldnjE3Y0' }, { id: 'sOsIKu2VAkM' }, { id: 'yi363I5MoAk' }],
    tags: ['Thriller', 'Drama', 'Horror'],
    writers: ['Christopher Nolan'],
    directors: ['Christopher Nolan'],
    runtime: '3h1m'
  },
  {
    title: "Oppenheimer",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    release_date: "07-21-2023",
    release_year: '2023',
    overview: 'The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.',
    tag: 'The world forever changes.',
    id: 2,
    clips: [{ id: 'uYPbbksJxIg' }, { id: 'bK6ldnjE3Y0' }, { id: 'sOsIKu2VAkM' }, { id: 'yi363I5MoAk' }],
    tags: ['Thriller', 'Drama', 'Horror'],
    writers: ['Christopher Nolan'],
    directors: ['Christopher Nolan'],
    runtime: '3h1m'
  },
  {
    title: "Moonrise Kingdom",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xrziXRHRQ7c7YLIehgSJY8GQBsx.jpg",
    release_date: "05-25-2012",
    release_year: '2012',
    overview: 'Set on an island off the coast of New England in the summer of 1965, Moonrise Kingdom tells the story of two twelve-year-olds who fall in love, make a secret pact, and run away together into the wilderness. As various authorities try to hunt them down, a violent storm is brewing off-shore – and the peaceful island community is turned upside down in more ways than anyone can handle.',
    tag: 'A tormenting and surprising story of children and adults during the stormy days of the summer of 1965.',
    id: 1,
    clips: [{ id: 'RBCRe73dZb0' }, { id: 'qtnq_Ffieno' }, { id: '_eOI3AamSm8' }, { id: 'uDph9wSeWvY' }],
    tags: ['Comedy', 'Drama', 'Romance'],
    writers: ['Wes Anderson', 'Roman Coppola'],
    directors: ['Wes Anderson'],
    runtime: '1h34m'
  },
]
