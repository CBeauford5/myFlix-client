import PropTypes from 'prop-types';
export const MovieCard = ({ movie, onMovieClick}) => {
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

//PropTypes return conditions
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};