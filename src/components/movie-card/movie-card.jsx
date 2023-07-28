import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AddFavoriteMovie,
  RemoveFromFavorites
} from '../../services/api-calls';
import { setUser } from '../../redux/reducers/user';

export const MovieCard = ({ movie }) => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  return (
    <>
      <Card
        as={Link}
        to={`/movies/${encodeURIComponent(movie.id)}`}
        bg="secondary"
        className="h-100 custom-card movie-card"
      >
        <Card.Img variant="top" src={movie.image} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.director.name}</Card.Text>
        </Card.Body>
      </Card>
      {user.FavoriteMovies.includes(movie.id) ? (
        <Button
          className="mt-1"
          onClick={() => {
            RemoveFromFavorites(user, movie, token).then((data) => {
              localStorage.setItem('user', JSON.stringify(data));
              dispatch(setUser(data));
            });
          }}
        >
          Unfavorite
        </Button>
      ) : (
        <Button
          className="mt-1"
          onClick={() => {
            AddFavoriteMovie(user, movie, token).then((data) => {
              localStorage.setItem('user', JSON.stringify(data));
              dispatch(setUser(data));
            });
          }}
        >
          Favorite
        </Button>
      )}
    </>
  );
};

MovieCard.proptypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string
    })
  }).isRequired
};
