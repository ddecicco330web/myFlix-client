import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
  return (
    <Card
      as={Link}
      to={`/movies/${encodeURIComponent(movie.title)}`}
      bg="secondary"
      className="h-100 custom-card movie-card"
    >
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.name}</Card.Text>
      </Card.Body>
    </Card>
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
