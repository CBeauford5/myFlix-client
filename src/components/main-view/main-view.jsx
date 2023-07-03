import { useState, useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Col, Button, Row } from "react-bootstrap";
import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;
    fetch("https://my-movie-database-api-b1811320c6f7.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            title: movie.title,
            imageURL: movie.imageURL,
            description: movie.description,
            genre: movie.genre.name,
            director: movie.director.name,
            year: movie.year
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setToken(token);
              setUser(user);
            }}
          />
          <br></br>
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : (
        <>
          <Row>
            <Col md={3}>
              <Button
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
              >
                Logout
              </Button>
            </Col>
          </Row>

          {movies.map((movie) => (
            <Col className="mb-5 mt-3" key={movie._id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
      
    </Row>
  );
};
