import { useParams } from 'react-router';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { DeleteUser } from '../../services/api-calls';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({
  users,
  resetChanges,
  onDelete,
  token,
  movies
}) => {
  if (users.length === 0) {
    return;
  }
  const { username } = useParams();
  const user = users.find((arrUser) => arrUser.username === username);

  useEffect(() => resetChanges(user), []);

  let date = new Date(user.birthday);

  let dateString = new Date(date.getTime()).toISOString().split('T')[0];

  let favoriteMovies = movies.filter((m) => user.favoriteMovies.includes(m.id));

  return (
    <>
      <Card bg="secondary">
        <Card.Title className="mt-1 ms-1">
          Username: {user.username}{' '}
        </Card.Title>
        <Card.Text className="ms-1 mb-1">Email: {user.email}</Card.Text>
        <Card.Text className="ms-1">Birthday: {dateString}</Card.Text>
        <Button
          className="ms-1 me-1"
          as={Link}
          to={`/users/${encodeURIComponent(username)}/editProfile`}
        >
          Edit Profile
        </Button>
        <Button
          className="mt-1 ms-1 me-1 mb-1"
          onClick={() => {
            DeleteUser(username, token, onDelete);
          }}
        >
          Delete Account
        </Button>
      </Card>
      <hr />
      <Row>
        <Col>
          <h2>Favorite Movies:</h2>
        </Col>
      </Row>
      <Row classname="justify-content-md-center">
        {favoriteMovies.map((movie) => {
          return (
            <Col className="mb-5 mt-1" key={movie.id} md={3}>
              <MovieCard movie={movie} />
              <Button
                className="mt-1"
                onClick={() => {
                  fetch(
                    `https://my-flix330.herokuapp.com/users/${encodeURIComponent(
                      username
                    )}/movies/${encodeURIComponent(movie.id)}`,
                    {
                      method: 'DELETE',
                      headers: {
                        Authorization: `Bearer ${token}`
                      }
                    }
                  )
                    .then((response) => {
                      if (response.ok) {
                        alert('Movie removed');
                        window.location.reload();
                      } else {
                        alert('Failed to remove movie');
                      }
                    })
                    .catch((e) => console.log(e));
                }}
              >
                Remove
              </Button>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
