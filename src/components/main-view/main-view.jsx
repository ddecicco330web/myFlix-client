import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Inception',
      image:
        'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/7dfddd911b8040729896c5be83f8e139_6e2f4149-8cb4-414c-a33b-9e0065c55af3_480x.progressive.jpg?v=1573585216',
      director: 'Christopher Nolan',
      description:
        'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      genre: 'Action',
    },
    {
      id: 2,
      title: 'The Godfather',
      image: 'https://i.ebayimg.com/images/g/X~cAAOSwz2ZiaB2w/s-l1600.jpg',
      director: 'Francis Ford Copola',
      description:
        'The Coreleon crime family struggles to survive from the attacks of the other families.',
      genre: 'Drama',
    },
    {
      id: 3,
      title: 'The Dark Knight',
      image:
        'https://m.media-amazon.com/images/I/51rF2-tvXVL._AC_UF894,1000_QL80_.jpg',
      director: 'Christopher Nolan',
      description: 'Batman has to save Gotham City from the Joker.',
      genre: 'Action',
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => {
          setSelectedMovie(null);
        }}
      />
    );
  }

  if (movies.length === 0) {
    return <div>There are no movies!</div>;
  }

  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};

export default MainView;
