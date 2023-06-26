import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://my-flix330.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
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
  }, [token]);

  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

  if (selectedMovie) {
    const similarMovies = movies.filter(
      (movie) =>
        movie.genre.name === selectedMovie.genre.name &&
        movie.title !== selectedMovie.title
    );
    return (
      <div>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => {
            setSelectedMovie(null);
          }}
        />
        <div>
          <hr />
          <h2>Similar Movies</h2>
        </div>
        <div>
          {similarMovies.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                movies={movies}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
  if (movies.length === 0) {
    return <div>There are no movies!</div>;
  }

  return (
    <div>
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            movies={movies}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};
