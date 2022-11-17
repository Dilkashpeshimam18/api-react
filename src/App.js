import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movieData, setMovieData] = useState([])
  const fetchMovie = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/films/', {
        method: 'GET'
      })
      const data = await response.json()
      console.log(data.results)
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
    }

  }
  const dummyMovies = [
    {
      id: 1,
      title: 'Some Dummy Movie',
      openingText: 'This is the opening text of the movie',
      releaseDate: '2021-05-18',
    },
    {
      id: 2,
      title: 'Some Dummy Movie 2',
      openingText: 'This is the second opening text of the movie',
      releaseDate: '2021-05-19',
    },
  ];

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovie}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movieData} />
      </section>
    </React.Fragment>
  );
}

export default App;
