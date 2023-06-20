import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
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
