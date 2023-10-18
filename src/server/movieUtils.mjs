import fetch from 'node-fetch'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.BEARER_TOKEN}`
  }
};

export const getDiscoveredMovies = async (type) => {
  if (type === 'theatre') {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&region=NL&sort_by=popularity.desc'

    const response = await fetch(url, options);
    const data = await response.json();

    return data.results;
  }

  if (type === 'upcoming') {
    const dateStringFrom = returnDate('from')
    const dateStringTill = returnDate('till')

    const urlPageOne = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=${dateStringFrom}&primary_release_date.lte=${dateStringTill}&sort_by=popularity.desc&with_release_type=3`
    const urlPageTwo = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&primary_release_date.gte=${dateStringFrom}&primary_release_date.lte=${dateStringTill}&sort_by=popularity.desc&with_release_type=3`

    const responsePageOne = await fetch(urlPageOne, options);
    const dataPageOne = await responsePageOne.json();

    const responsePageTwo = await fetch(urlPageTwo, options);
    const dataPageTwo = await responsePageTwo.json();

    const results = [...dataPageOne.results, ...dataPageTwo.results]

    return results
  }
}

const returnDate = (type) => {
  const amountOfDays = type === "from" ? 14 : 180
  const currentDate = new Date();
  const futureDate = new Date(currentDate);

  futureDate.setDate(currentDate.getDate() + amountOfDays);

  const year = futureDate.getFullYear();
  const month = String(futureDate.getMonth() + 1).padStart(2, '0');
  const day = String(futureDate.getDate()).padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;

  return dateString;
}

export const getMovies = async (query, type) => {
  if (type === 'movieSearch') {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  }

  if (type === 'personSearch') {
    const url = `https://api.themoviedb.org/3/person/${query}?append_to_response=movie_credits&language=en-US`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data
  }

  if (type == 'personsSearch') {
    const url = `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`;

    const response = await fetch(url, options);
    const personsResults = await response.json();

    const persons = personsResults.results.slice(0, 2)
    const ids = personsResults.results.slice(0, 2).map((person) => person.id)

    const movies = ids.map(async (id) => {
      const url = `https://api.themoviedb.org/3/person/${id}?append_to_response=movie_credits&language=en-US`;
      const response = await fetch(url, options);
      const data = await response.json();
      return data
    })

    // also check cast (Brad Pitt)

    const firstResults = Promise.all(movies)
      .then((movieData) => {
        return movieData[0]?.movie_credits.crew.filter((crew) => crew.job === 'Director')
      })

    const secondResults = Promise.all(movies)
      .then((movieData) => {
        return movieData[1]?.movie_credits.crew.filter((crew) => crew.job === 'Director')
      })

    const firstPersonData = Promise.all(movies)
      .then((movieData) => {
        return movieData[0]
      })

    const secondPersonData = Promise.all(movies)
      .then((movieData) => {
        return movieData[1]
      })


    const firstPerson = {
      ...returnFirstPersonData(await firstPersonData),
      movies: sortMoviesOnReleaseDate(await firstResults)
    }

    const secondPerson = {
      ...returnSecondPersonData(await secondPersonData),
      movies: sortMoviesOnReleaseDate(await secondResults)
    }

    return [firstPerson, secondPerson];

  }
}

function returnFirstPersonData(person) {
  return person
}

function returnSecondPersonData(person) {
  return person
}

export const getMoviesCredits = async (movies) => {
  const movieCredits = await Promise.all(movies.map(async (movie) => {
    const url = `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US'`;

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  }))

  const directors = filterCreditsDirector(movieCredits)
  const cast = filterCreditsCast(movieCredits)

  return { directors, cast };
}

export const getMovieCredits = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US'`;

  const response = await fetch(url, options);
  const data = await response.json();

  let crew = data.crew
  let cast = data.cast

  const crewPerson = crew.map((crew) => {return {...returnPersonData(crew)} })
  const castPerson = cast.map((cast) => {return {...returnPersonData(cast)} })

  const crewCredit = crew.map((crew) => {return {...returnCreditData(crew)} })
  const castCredit = cast.map((cast) => {return {...returnCreditData(cast)} })

  return { crewPerson, castPerson, crewCredit, castCredit };
}

export const returnPersonData = (credit) => {
  return {
    adult: credit.adult,
    gender: credit.gender,
    tmdb_id: credit.id,
    known_for_department: credit.known_for_department,
    name: credit.name,
    original_name: credit.original_name,
    popularity: credit.popularity,
    profile_path: credit.profile_path,
  }
}

export const returnCreditData = (credit) => {
  return {
    credit_id: credit.credit_id,
    department: credit.department,
    job: credit.job,
    cast_id: credit.cast_id,
    character: credit.character,
    order: credit.order,
    tmdb_id: credit.id,
  }
}


export const getMovieDetails = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=videos`;

  const response = await fetch(url, options);
  const data = await response.json();

  return data
}

export const getMovieReleaseDatesAndCertifications = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/693134/release_dates`

  const response = await fetch(url, options);
  const data = await response.json();

  return data
}

export const filterReleaseDatesAndCertifications = async (id) => {
  const releaseDates = await getMovieReleaseDatesAndCertifications(id);

  const nlOrUsReleaseDates = releaseDates.results
    .filter((entry) => entry.iso_3166_1 === 'NL' || entry.iso_3166_1 === 'US')
    .flatMap((entry) => entry.release_dates.filter((date) => date.type === 3));

  if (nlOrUsReleaseDates[0].certification === '') {
    nlOrUsReleaseDates[0].certification = 'NA'
  }

  return nlOrUsReleaseDates[0]
}

export const filterClips = (clips) => {
  const filteredClips = clips
    .filter((clip) => clip.site === 'YouTube')
    .filter((clip) => clip.official === true)
    .filter((clip) => clip.type === 'Trailer')
    .map((clip) => {
      return {
        name: clip.name,
        key: clip.key,
        site: clip.site,
        type: clip.type,
        official: clip.official,
        published_at: clip.published_at
      }
    })

  return filteredClips;
}

export const filterMovies = (movies, query) => {
  const filtededMovies = movies
    .filter((movie) => movie.poster_path !== null)
    .filter((movie => String(movie.popularity).replace('.', '') > 1000))
    .filter((movie => filterByTitleCheck(movie, query)))

  return filtededMovies;
}

export const filterCreditsCrew = (movie) => {
  return
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
      if (removeSpecialCharacters(movieTitleWord).includes(queryWord) || queryWord.includes(removeSpecialCharacters(movieTitleWord))) {
        return movie
      }
    }
  }
}

export const sortMoviesOnAddedDate = movies => {
  const sortedMovies = movies?.sort((a, b) => {
    const dateA = new Date(a.added_at)
    const dateB = new Date(b.added_at)

    return dateB - dateA
  });

  return sortedMovies
}

export const sortMoviesOnReleaseDate = (movies) => {
  const sortedMovies = movies?.sort((a, b) => {
    const dateA = new Date(a.release_date)
    const dateB = new Date(b.release_date)

    return dateB - dateA
  });

  return sortedMovies
}

function removeSpecialCharacters(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
