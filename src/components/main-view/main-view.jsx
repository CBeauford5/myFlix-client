import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The King's Speech",
      description: "The story of King George VI, his unexpected ascension to the throne of the British Empire in 1936, and the speech therapist who helped the unsure monarch overcome his stammer.",
      director: "Tom Hooper",
      genre: "Biopic",
      imageURL: "https://images-na.ssl-images-amazon.com/images/I/51N2h0Z3SZL._RI_SX300_.jpg",
      year: "2010"
    },
    {
      id: 2,
      title: "Idiocracy",
      description: "Corporal Joe Bauers, a decisively average American, is selected as a guinea pig for a top-secret hibernation program but is forgotten, awakening to a future so incredibly moronic that he is easily the smartest person alive!",
      genre: "Comedy",
      director: "Mike Judge",
      imageURL: "https://images-na.ssl-images-amazon.com/images/I/514YPd-U5hL._AC_SY450_.jpg",
      year: "2006"
    },
    {
      id: 3,
      title: "The Cable Guy",
      description: "A designer makes a grievious mistake when he rejects the friendship of a borderline cable guy.",
      genre: "Thriller",
      director: "Ben Stiller",
      imageURL: "https://image.tmdb.org/t/p/w300/5cZySBvy41eHTD5LyQn48aP444k.jpg",
      year: "1996"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};