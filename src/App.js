import React, { useState } from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movieData, setMovieData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const fetchMovie = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('https://swapi.dev/api/films/', {
        method: 'GET'
      })
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
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }

  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovie}>Fetch Movies</button>
      </section>
      <section>
        {isLoading == true ? <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
          : <MoviesList movies={movieData} />}

      </section>
    </React.Fragment>
  );
}

export default App;
