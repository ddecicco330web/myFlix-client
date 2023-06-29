import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card className="no-border">
      <Card.Img variant="top" className="w-100" src={movie.image} />

      <Card.Title>
        <p>Title: {movie.title}</p>
      </Card.Title>
      <Card.Text>Director: {movie.director.name}</Card.Text>
      <Card.Text>Description: {movie.description}</Card.Text>
      <Card.Text>Genre: {movie.genre.name}</Card.Text>
      <Button variant="primary" className="mb-5" onClick={onBackClick}>
        Back
      </Button>
    </Card>
  );
};
