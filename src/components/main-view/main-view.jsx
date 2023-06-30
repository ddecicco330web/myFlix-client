import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { Container } from 'react-bootstrap';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');

  const [movies, setMovies] = useState([]);
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
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path="/movies/:movieTitle"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : (
                  <>
                    <Col md={8}>
                      <MovieView movies={movies} />
                    </Col>

                    {/* <Row className="justify-center-md-center">
                      <hr />
                      <Col md={3}>
                        <h2>Similar Movies</h2>
                      </Col>
                    </Row> */}
                    {/* <Row className="justify-content-md-center">
                    {movies
                      .filter(
                        (movie) =>
                          movie.genre.name === selectedMovie.genre.name &&
                          movie.title !== selectedMovie.title
                      )
                      .map((movie) => (
                        <Col className="mb-5" key={movie.id} md={3}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                  </Row> */}
                  </>
                )
              }
            />

            <Route
              path="/"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : movies.length === 0 ? (
                  <Col>There are no movies!</Col>
                ) : (
                  <Row>
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </Row>
                )
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
