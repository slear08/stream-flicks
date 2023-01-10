import React, { useState, useEffect } from "react";

import MovieCard from "./components/MovieCard";
import { BiSearchAlt } from "react-icons/bi";
import "./styles/App.css"



const API_URL = "http://www.omdbapi.com?apikey=2362a039";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("all");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>Stream Flicks</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <BiSearchAlt className="search-icon" onClick={() => searchMovies(searchTerm)}/>
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie,key) => (
            <MovieCard movie={movie} key={key}/>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};
export default App;