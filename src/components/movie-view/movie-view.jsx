import { useParams } from 'react-router';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {
  AddFavoriteMovie,
  RemoveFromFavorites
} from '../../services/api-calls';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user';

export const MovieView = ({ similarMovies }) => {
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
      </Card>
      {similarMovies(movie)}
    </>
  );
};
