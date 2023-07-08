import { useParams } from 'react-router';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DeleteUser, RemoveFromFavorites } from '../../services/api-calls';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ user, onDelete, token, movies, setUser }) => {
  const { username } = useParams();
  if (!user) {
    return;
  }
  console.log(user);
  let date = new Date(user.Birthday);

  let dateString = new Date(date.getTime()).toISOString().split('T')[0];

  let favoriteMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id));

  return username === user.Username ? (
    <>
      <Card bg="secondary">
        <Card.Title className="mt-1 ms-1">
          Username: {user.Username}{' '}
        </Card.Title>
        <Card.Text className="ms-1 mb-1">Email: {user.Email}</Card.Text>
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
      <Row>
        {favoriteMovies.map((movie) => {
          return (
            <Col className="mb-5 mt-1" key={movie.id} md={3}>
              <MovieCard movie={movie} />
              <Button
                className="mt-1"
                onClick={() => {
                  RemoveFromFavorites(user, movie, token, setUser);
                }}
              >
                Remove
              </Button>
            </Col>
          );
        })}
      </Row>
    </>
  ) : (
    <Row>Invalid username</Row>
  );
};
