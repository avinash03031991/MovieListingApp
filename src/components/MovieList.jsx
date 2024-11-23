import React from "react";
import "./css/MovieList.css";

const MovieList = ({ movies, onSelectMovie, selectedMovie }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div
          key={movie.episode_id}
          className={`movie-item ${
            selectedMovie?.episode_id === movie.episode_id ? "selected" : ""
          }`}
          onClick={() => onSelectMovie(movie)}
        >
          <h4>
            Episode {movie.episode_id}: {movie.title}
          </h4>
          <p>{movie.release_date}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
