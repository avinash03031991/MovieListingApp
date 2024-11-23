import React from "react";
import "./css/MovieDetail.css";

const MovieDetail = ({ movie }) => {
  return (
    <div className="movie-detail">
      {movie ? (
        <>
          <h2>
            Episode {movie.episode_id}: {movie.title}
          </h2>
          <p>{movie.opening_crawl}</p>
          <p>Director: {movie.director}</p>
          <p>Release Date: {movie.release_date}</p>
        </>
      ) : (
        <p>Select a movie to see the details</p>
      )}
    </div>
  );
};

export default MovieDetail;
