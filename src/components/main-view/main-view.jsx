import { useEffect, useState } from 'react';
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

export const MainView = () => {
  if (localStorage.getItem('user') === 'undefined') {
    localStorage.clear();
  }
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');

  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBirthday, setNewBirthday] = useState('');

  useEffect(() => {
    if (!token) {
      return;
    }

    GetMovies(token, setMovies);
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
              path="/movies/:movieID"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : (
                  <Col md={8}>
                    <MovieView
                      movies={movies}
                      user={user}
                      token={token}
                      setUser={setUser}
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
                    <ProfileView
                      user={user}
                      token={token}
                      movies={movies}
                      setUser={setUser}
                      onDelete={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                    />
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
                    <EditProfileView
                      user={user}
                      token={token}
                      setUser={setUser}
                      newUsername={newUsername}
                      setNewUsername={setNewUsername}
                      newPassword={newPassword}
                      setNewPassword={setNewPassword}
                      newEmail={newEmail}
                      setNewEmail={setNewEmail}
                      newBirthday={newBirthday}
                      setNewBirthday={setNewBirthday}
                      resetChanges={(user) => {
                        setNewUsername(user.Username);
                        setNewPassword('');
                        setNewEmail(user.Email);
                        setNewBirthday(user.Birthday);
                      }}
                    />
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
