import { useParams } from 'react-router';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {
  AddFavoriteMovie,
  RemoveFromFavorites
} from '../../services/api-calls';

export const MovieView = ({ movies, user, token, similarMovies, setUser }) => {
  if (movies.length === 0) {
    return;
  }

  console.log(user);
  const { movieID } = useParams();
  const movie = movies.find((arrMovie) => arrMovie.id === movieID);

  const favorite = user.FavoriteMovies.includes(movie.id);

  return (
    <>
      <Card className="no-border">
        <Card.Img variant="top" className="w-100" src={movie.image} />

        <Card className="mb-5 custom-card" bg="light">
          <Card.Title className="mt-1 ms-1">
            <p>Title: {movie.title}</p>
          </Card.Title>
          <Card.Text className="ms-1">
            Director: {movie.director.name}
          </Card.Text>
          <Card.Text className="ms-1">
            Description: {movie.description}
          </Card.Text>
          <Card.Text className="mb-1 ms-1">Genre: {movie.genre.name}</Card.Text>
          {!favorite ? (
            <Button
              onClick={() => {
                AddFavoriteMovie(user, setUser, movie, token);
              }}
            >
              Favorite
            </Button>
          ) : (
            <Button
              onClick={() => RemoveFromFavorites(user, movie, token, setUser)}
            >
              Unfavorite
            </Button>
          )}
        </Card>
      </Card>
      {similarMovies(movie)}
    </>
  );
};
