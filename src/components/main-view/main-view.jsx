import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://my-flix330.herokuapp.com/movies')
      .then((response) => response.json())
      .then((data) => {
        const moviesFromAPI = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            director: {
              name: doc.Director?.[0].Name
            },
            description: doc.Description,
            genre: {
              name: doc.Genre?.Name
            },
            image: doc.ImagePath
          };
        });
        console.log(moviesFromAPI);
        setMovies(moviesFromAPI);
      })
      .catch((err) => console.log(err));
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => {
          setSelectedMovie(null);
        }}
      />
    );
  }
  if (movies.length === 0) {
    return <div>There are no movies!</div>;
  }

  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};
