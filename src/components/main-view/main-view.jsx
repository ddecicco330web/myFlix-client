import { useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { Col, Row, Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { GetMovies } from '../../services/api-calls';
import { ProfileView } from '../profile-view/profile-view';
import { EditProfileView } from '../edit-profile-view/edit-profile-view';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../../redux/reducers/movies';
import { MoviesList } from '../movies-list/movies-list';

export const MainView = () => {
  if (localStorage.getItem('user') === 'undefined') {
    localStorage.clear();
  }

  const movies = useSelector((state) => {
    return state.movies.list;
  });
  const user = useSelector((state) => {
    return state.user.user;
  });
  const token = useSelector((state) => {
    return state.user.token;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }
    GetMovies(token).then((data) => {
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
      dispatch(setMovies(moviesFromAPI));
    });
  }, [token]);

  return (
    <BrowserRouter>
      <Container>
        <Row>
          <NavigationBar />
        </Row>
        <Row className="justify-content-md-center mt-5">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col sm={12}>
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
                    <Col sm={12}>
                      <LoginView />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path="/movies/:movieID"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : (
                  <Col md={8}>
                    <MovieView
                      similarMovies={(movie) => {
                        return (
                          <Row>
                            <hr />
                            <Row className="text-center">
                              <Col>
                                <h2>Similar Movies</h2>
                              </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                              {movies
                                .filter(
                                  (tempMovie) =>
                                    movie.genre.name === tempMovie.genre.name &&
                                    movie.title !== tempMovie.title
                                )
                                .map((tempMovie) => (
                                  <Col
                                    className="mb-5"
                                    key={tempMovie.id}
                                    md={3}
                                  >
                                    <MovieCard movie={tempMovie} />
                                  </Col>
                                ))}
                            </Row>
                          </Row>
                        );
                      }}
                    />
                  </Col>
                )
              }
            />

            <Route
              path="/users/:username"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : (
                  <Col>
                    <ProfileView />
                  </Col>
                )
              }
            />

            <Route
              path="/users/:username/editProfile"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : (
                  <Col>
                    <EditProfileView />
                  </Col>
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
                  <>
                    <MoviesList />
                  </>
                )
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
