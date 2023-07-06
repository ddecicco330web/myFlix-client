import { useParams } from 'react-router';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const MovieView = ({ movies, user, token, similarMovies }) => {
  if (movies.length === 0) {
    return;
  }
  const { movieID } = useParams();
  const movie = movies.find((arrMovie) => arrMovie.id === movieID);

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
          <Button
            onClick={() => {
              fetch(
                `https://my-flix330.herokuapp.com/users/${encodeURIComponent(
                  user.Username
                )}/movies/${encodeURIComponent(movie.id)}`,
                {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
              )
                .then((response) => {
                  if (response.ok) {
                    alert('Added to favorites');
                  } else {
                    alert('Unable to add to favorites');
                  }
                })
                .catch((e) => console.log(e));
            }}
          >
            Favorite
          </Button>
        </Card>
      </Card>
      {similarMovies(movie)}
    </>
  );
};
