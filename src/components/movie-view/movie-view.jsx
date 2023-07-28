import { useParams } from 'react-router';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {
  AddFavoriteMovie,
  RemoveFromFavorites
} from '../../services/api-calls';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user';

export const MovieView = ({ similarMovies }) => {
  document.documentElement.scrollTop = 0;
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  const { movieID } = useParams();

  if (movies.length === 0) {
    return;
  }
  const movie = movies.find((arrMovie) => arrMovie.id === movieID);

  const favorite = user.FavoriteMovies.includes(movie.id);

  return (
    <>
      <Row>
        <Col md={4}>
          <Card className="no-border mb-5">
            <Card.Img variant="top" className="mb-1" src={movie.image} />
            {!favorite ? (
              <Button
                onClick={() => {
                  AddFavoriteMovie(user, movie, token).then((data) => {
                    localStorage.setItem('user', JSON.stringify(data));
                    dispatch(setUser(data));
                  });
                }}
              >
                Favorite
              </Button>
            ) : (
              <Button
                onClick={() =>
                  RemoveFromFavorites(user, movie, token).then((data) => {
                    localStorage.setItem('user', JSON.stringify(data));
                    dispatch(setUser(data));
                  })
                }
              >
                Unfavorite
              </Button>
            )}
          </Card>
        </Col>
        <Col>
          <div className="ratio ratio-16x9 mb-3 ">
            <iframe
              src={movie.trailer}
              title="Movie Trailer"
              allowFullScreen
            ></iframe>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card className="mb-5 custom-card" bg="light">
            <Card.Title className="mt-1 ms-1">
              <p>Title: {movie.title}</p>
            </Card.Title>
            <Card.Text className="ms-1">
              Director:{' '}
              <Link to={`/cast/${movie.director.name}`}>
                {movie.director.name}
              </Link>
            </Card.Text>

            <Card.Text className="ms-1">
              Top Actors:{' '}
              {movie.actors.map((actor) => (
                <Link
                  className="me-3"
                  key={actor.Name}
                  to={`/cast/${actor.Name}`}
                >
                  {actor.Name}
                </Link>
              ))}
            </Card.Text>
            <Card.Text className="ms-1">Release: {movie.release}</Card.Text>
            <Card.Text className="ms-1">
              Description: {movie.description}
            </Card.Text>
            <Card.Text className="ms-1">Genre: {movie.genre.name}</Card.Text>
            <Card.Text className="ms-1">Rating: {movie.rating}/10</Card.Text>
          </Card>
        </Col>
      </Row>
      {similarMovies(movie)}
    </>
  );
};
