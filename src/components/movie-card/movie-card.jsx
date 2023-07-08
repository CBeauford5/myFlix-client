import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={movie.imageURL}
        className="border"
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">
            Open
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

//PropTypes return conditions
MovieCard.propTypes = {
  movie: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      director: PropTypes.shape({
          name: PropTypes.string,
          bio: PropTypes.string
      }),
      genre: PropTypes.shape({
          name: PropTypes.string,
          description: PropTypes.string
      }),
  }).isRequired
};