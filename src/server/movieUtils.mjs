import fetch from 'node-fetch'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.BEARER_TOKEN}`
  }
};

export const getMovies = async (query) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

export const getMovieCredits = async (movies) => {
  const movieCredits = await Promise.all(movies.map(async (movie) => {
    const url = `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US', options`;

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  }))

  const directors = filterCreditsDirector(movieCredits)
  const cast = filterCreditsCast(movieCredits)

  return { directors, cast };
}

export const filterMovies = (movies, query) => {
  const filtededMovies = movies
    .filter((movie) => movie.poster_path !== null)
    .filter((movie => String(movie.popularity).replace('.', '') > 1000))
    .filter((movie => filterByTitleCheck(movie, query)))

  return filtededMovies;
}

export const filterCreditsDirector = (movies) => {
  return movies.map((movie) => movie.crew.filter((crew) => crew.job === 'Director'))
}

export const filterCreditsCast = (movies) => {
  return movies.map((movie) => { return movie.cast})
}

export const filterByTitleCheck = (movie, query) => {
  const movieTitleWords = movie.title.toLowerCase().split(/\s+/);
  const queryWords = query.toLowerCase().split(/\s+/)

  for (const movieTitleWord of movieTitleWords) {
    for (const queryWord of queryWords) {
      if (movieTitleWord.includes(queryWord) || queryWord.includes(movieTitleWord)) {
        return movie
      }
    }
  }
}

export const sortMoviesOnReleaseDate = (movies) => {
  const sortedMovies = movies.sort((a, b) => {
    const dateA = new Date(a.release_date)
    const dateB = new Date(b.release_date)

    return dateB - dateA
  });

  return sortedMovies
}
