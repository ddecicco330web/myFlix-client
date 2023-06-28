import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

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

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        ///// Login/Signup View /////
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        ///// Movie View /////
        <>
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => {
                setSelectedMovie(null);
              }}
            />
          </Col>
          <Row className="justify-content-md-center">
            <hr />
            <Col md={3}>
              <h2>Similar Movies</h2>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            {movies
              .filter(
                (movie) =>
                  movie.genre.name === selectedMovie.genre.name &&
                  movie.title !== selectedMovie.title
              )
              .map((movie) => (
                <Col className="mb-5" key={movie.id} md={3}>
                  <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              ))}
          </Row>
        </>
      ) : movies.length === 0 ? (
        ///// No Movies /////
        <Col>There are no movies!</Col>
      ) : (
        ///// View All Movie Cards /////
        <>
          <Col className="mb-5">
            <Button
              variant="primary"
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </Button>
          </Col>
          <Row>
            {movies.map((movie) => (
              <Col className="mb-5" key={movie.id} md={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Row>
  );

  //   if (!user) {
  //     return (
  //       <>
  //         <LoginView
  //           onLoggedIn={(user, token) => {
  //             setUser(user);
  //             setToken(token);
  //           }}
  //         />
  //         or
  //         <SignupView />
  //       </>
  //     );
  //   }

  //   if (selectedMovie) {
  //     const similarMovies = movies.filter(
  //       (movie) =>
  //         movie.genre.name === selectedMovie.genre.name &&
  //         movie.title !== selectedMovie.title
  //     );
  //     return (
  //       <div>
  //         <MovieView
  //           movie={selectedMovie}
  //           onBackClick={() => {
  //             setSelectedMovie(null);
  //           }}
  //         />
  //         <div>
  //           <hr />
  //           <h2>Similar Movies</h2>
  //         </div>
  //         <div>
  //           {similarMovies.map((movie) => {
  //             return (
  //               <MovieCard
  //                 key={movie.id}
  //                 movie={movie}
  //                 movies={movies}
  //                 onMovieClick={(newSelectedMovie) => {
  //                   setSelectedMovie(newSelectedMovie);
  //                 }}
  //               />
  //             );
  //           })}
  //         </div>
  //       </div>
  //     );
  //   }
  //   if (movies.length === 0) {
  //     return <div>There are no movies!</div>;
  //   }

  //   return (
  //     <div>
  //       <button
  //         onClick={() => {
  //           setUser(null);
  //           setToken(null);
  //           localStorage.clear();
  //         }}
  //       >
  //         Logout
  //       </button>
  //       {movies.map((movie) => {
  //         return (
  //           <MovieCard
  //             key={movie.id}
  //             movie={movie}
  //             movies={movies}
  //             onMovieClick={(newSelectedMovie) => {
  //               setSelectedMovie(newSelectedMovie);
  //             }}
  //           />
  //         );
  //       })}
  //     </div>
  //   );
};
