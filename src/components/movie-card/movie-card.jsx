import PropTypes from "prop-types";
import {Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      className="h-100"
      onClick={() => onMovieClick(movie)}
      style={{ curson: "pointer" }}
    >
      <Card.Img
        variant="top"
        src={movie.imageURL}
        className="border"
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
      </Card.Body>
    </Card>
  );
};

//PropTypes return conditions
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};