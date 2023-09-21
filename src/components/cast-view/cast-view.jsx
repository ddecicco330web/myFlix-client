import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Card, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const CastView = () => {
  document.documentElement.scrollTop = 0;
  const movies = useSelector((state) => state.movies.list);
  const { castMemberName } = useParams();

  const filterMovies = (tempMovie) => {
    if (tempMovie.director.name === castMemberName) {
      return true;
    }
    for (let i = 0; i < tempMovie.actors.length; i++) {
      if (tempMovie.actors?.[i].Name === castMemberName) {
        return true;
      }
    }
    return false;
  };

  const movie = movies.find((tempMovie) => filterMovies(tempMovie));

  const castMemberObj =
    movie.director.name === castMemberName
      ? movie.director
      : movie.actors.find((actor) => actor.Name === castMemberName);

  return (
    <>
      <Row className="mb-1">
        <Col>
          <Card md={4}>
            <Card.Img
              variant="top"
              src={
                castMemberObj.image
                  ? castMemberObj.image
                  : castMemberObj.ImagePath
              }
            />
          </Card>
        </Col>
        <Col md={8}>
          <Card className="custom-card" bg="light">
            <Card.Title className="mt-1 ms-1">
              {castMemberObj.name ? castMemberObj.name : castMemberObj.Name}
            </Card.Title>
            <Card.Text className="ms-1">
              Birth Year:{' '}
              {castMemberObj.birthYear
                ? castMemberObj.birthYear
                : castMemberObj.BirthYear}
            </Card.Text>
            <Card.Text className="mb-1 ms-1">
              Bio: {castMemberObj.bio ? castMemberObj.bio : castMemberObj.Bio}
            </Card.Text>
          </Card>
        </Col>
      </Row>
      <hr />
      <Row className="text-center">
        <Col>
          <h2>Movies</h2>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        {movies
          .filter((tempMovie) => filterMovies(tempMovie))
          .map((tempMovie) => (
            <Col className="mb-5" key={tempMovie.id} sm={6} md={3}>
              <MovieCard movie={tempMovie} />
            </Col>
          ))}
      </Row>
    </>
  );
};
