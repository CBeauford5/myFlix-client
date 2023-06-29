import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
  return (
      <div>
          <div>
              <img src={movie.imageURL} />
          </div>
          <div>
              <span>Title: </span>
              <span>{movie.title}</span>
          </div>
          <div>
              <span>Description: </span>
              <span>{movie.description}</span>
          </div>
          <div>
              <span>Genre: </span>
              <span>{movie.genre.name}</span>
          </div>
          <div>
              <span>Director: </span>
              <span>{movie.director.name}</span>
          </div>
          <div>
              <span>Year: </span>
              <span>{movie.year}</span>
          </div>
          <button onClick={onBackClick}>Back</button>
      </div>
  );
};

//PropType conditions
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre:  PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    }),
    onBackClick: PropTypes.func.isRequired
};
