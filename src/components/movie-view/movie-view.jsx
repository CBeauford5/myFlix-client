import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img className="w-100" src={movie.imageURL} />
            </div>
            <br />
            <div>
                <span><u>Title</u>: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span><u>Description</u>: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span><u>Genre</u>: </span>
                <span>{movie.genre}</span>
            </div>
            <div>
                <span><u>Director</u>: </span>
                <span>{movie.director}</span>
            </div>
            <div>
                <span><u>Year</u>: </span>
                <span>{movie.year}</span>
            </div>
            <Button onClick={onBackClick} className="back-button">Back</Button>
        </div>
    );
};

//PropType conditions
MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        imageURL: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
    }),
    onBackClick: PropTypes.func.isRequired
};