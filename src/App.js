import React, { useState, useEffect, useCallback, useMemo } from 'react';
import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movieData, setMovieData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMovie = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('https://swapi.dev/api/films/', {
        method: 'GET'
      })
      if (!response.ok) {
        throw new Error('Something went wrong...Retrying')
      }
      const data = await response.json()

      let transformedData = data.results.map((data) => {
        return {
          id: data.episode_id,
          title: data.title,
          openingText: data.opening_crawl,
          releaseDate: data.release_data
        }
      })
      setMovieData(transformedData)
    } catch (err) {
      console.log(err)
      setError(err.message)

    }

    setIsLoading(false)

  }, [])

  useEffect(() => {
    fetchMovie()
  }, [fetchMovie])
  const addMovieHandler = useCallback((movie) => {
    console.log(movie);
  }, [])


  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovie}>Fetch Movies</button>
      </section>
      <section>
        {isLoading == true ? <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>

          : <MoviesList movies={movieData} />}
        {!isLoading && error && <p>{error}</p>}

      </section>
    </React.Fragment>
  );
}

export default App;
