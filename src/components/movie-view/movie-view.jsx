export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <p>
          <span>Title: </span>
          <span>{movie.title}</span>
        </p>
      </div>
      <div>
        <p>
          <span>Director: </span>
          <span>{movie.director.name}</span>
        </p>
      </div>
      <div>
        <p>
          <span>Description: </span>
          <span>{movie.description}</span>
        </p>
      </div>
      <div>
        <p>
          <span>Genre: </span>
          <span>{movie.genre.name}</span>
        </p>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
