import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      bg="secondary"
      className="h-100 custom-card movie-card"
      onClick={() => {
        onMovieClick(movie);
      }}
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
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
