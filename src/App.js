import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import SortMenu from "./components/SortMenu";
import SearchBar from "./components/SearchBar";
import ErrorBoundary from "./components/ErrorBoundary";

import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortType, setSortType] = useState("episode");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://swapi.dev/api/films/?format=json")
      .then((response) => response.json())
      .then((data) => {
        const sortedMovies = data.results.sort(
          (a, b) => a.episode_id - b.episode_id
        );
        setMovies(sortedMovies);
        setFilteredMovies(sortedMovies);
        setLoading(false); // Set loading to false after fetching data
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  const handleSort = (type) => {
    setSortType(type);
    const sorted = [...filteredMovies].sort((a, b) =>
      type === "year"
        ? new Date(a.release_date) - new Date(b.release_date)
        : a.episode_id - b.episode_id
    );
    setFilteredMovies(sorted);
  };

  const handleSearch = (query) => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <div className="header">
          <SortMenu onSort={handleSort} />
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="content">
          {loading && (
            <div className="loading-container">
              <p>Loading movies...</p>
            </div>
          )}
          {error && <p>{error}</p>}
          {!loading && !error && (
            <>
              <ErrorBoundary>
                <MovieList
                  movies={filteredMovies}
                  onSelectMovie={setSelectedMovie}
                  selectedMovie={selectedMovie}
                />
              </ErrorBoundary>
              <ErrorBoundary>
                <MovieDetail movie={selectedMovie} />
              </ErrorBoundary>
            </>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
