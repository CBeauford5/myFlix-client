import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

export const MovieView = ({ movies, user, token, updateUser }) => {

    const { movieId } = useParams();

    const movie = movies.find((m) => m._id === movieId);

    const [isFavoriteMovie, setAsFavorite] = useState(
        user.favoriteMovies.includes(movie.id)
    );

    useEffect(() => {
        setAsFavorite(user.favoriteMovies.includes(movie._id));
    }, [movieId]);

    const addFavorite = () => {
        fetch(
            `https://my-movie-database-api-b1811320c6f7.herokuapp.com/users/${user.username}/movies/${movieId}`,
            {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Failed");
                    return false;
                }
            })
            .then((user) => {
                if (user) {
                    alert("Successfully added to favorites");
                    setAsFavorite(true);
                    updateUser(user);
                }
            })
            .catch((e) => {
                alert(e);
            });
    };

    const removeFavorite = () => {
        fetch(`https://my-movie-database-api-b1811320c6f7.herokuapp.com/users/${user.username}/movies/${movieId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Failed");
                    return false;
                }
            })
            .then(user => {
                if (user) {
                    alert(`"${movie.title}" was successfully deleted from favorites`);
                    setAsFavorite(false);
                    updateUser(user);
                }
            })
            .catch(e => {
                alert(e);
            });
    }


    return (
        <div>
            <div>
                <img className="w-50" src={movie.imageURL} />
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
            <Link to={"/"}>
                <Button className="back-button m-4">Back</Button>
            </Link>
            {isFavoriteMovie ?
                <Button className="ms-2" onClick={removeFavorite}>Remove from favorites</Button>
                :
                <Button className="ms-2" onClick={addFavorite}>Add to favorites</Button>
            }
        </div>
    );
};


