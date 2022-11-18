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
      const response = await fetch('https://crud-d96e0-default-rtdb.firebaseio.com/movies.json')
      if (!response.ok) {
        throw new Error('Something went wrong...Retrying')
      }
      const data = await response.json()
      const loadedData = []
      for (let key in data) {
        loadedData.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate

        })
      }
      setMovieData(loadedData)
    } catch (err) {
      console.log(err)
      setError(err.message)

    }

    setIsLoading(false)

  }, [])

  useEffect(() => {
    fetchMovie()
  }, [fetchMovie])

  const addMovieHandler = useCallback(async (movie) => {
    try {
      const response = await fetch('https://crud-d96e0-default-rtdb.firebaseio.com/movies.json', {
        method: 'POST',
        body: JSON.stringify(movie),//convert js object or array into json format
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      fetchMovie()

    } catch (err) {
      console.log(err)
    }

  }, [])

  const deleteMovieHandler = useCallback(async (id) => {
    try {
      await fetch(`https://crud-d96e0-default-rtdb.firebaseio.com/movies/${id}.json`, {
        method: 'DELETE'
      })
      fetchMovie()
    } catch (err) {
      console.log(err)
    }

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

          : <MoviesList deleteMovie={deleteMovieHandler} movies={movieData} />}
        {!isLoading && error && <p>{error}</p>}

      </section>
    </React.Fragment>
  );
}

export default App;
