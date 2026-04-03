import { Routes, Route } from 'react-router-dom'
import MovieDetails from './MovieDetails'
import MovieCard from './moviecard'
import { useState, useEffect, useRef } from 'react'

import './App.css'


function App() {

  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites")
    return saved ? JSON.parse(saved) : []


  })
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark"
  })
  useEffect(() => {
    localStorage.setItem("theme", theme)
    document.body.className = theme
  }, [theme])
  function toggleTheme() {
    setTheme(prev => (prev === "dark" ? "light" : "dark"))
  }

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])
  const searchRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSuggestions([])
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  const apiKey = "44517455"

  async function searchMovie() {

    if (query.trim() === "") return

    setLoading(true)

    const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.Response === "True") {
      setMovies(data.Search)
      setError("")
    } else {
      setMovies([])
      setError(data.Error)
    }

    setLoading(false)
  }
  function toggleFavorite(movie) {
    const exists = favorites.find(fav => fav.imdbID === movie.imdbID)

    if (exists) {
      setFavorites(favorites.filter(fav => fav.imdbID !== movie.imdbID))
    } else {
      setFavorites([...favorites, movie])
    }
  }

  return (
    <div className="app">

      <Routes>

        {/* HOME PAGE */}
        <Route path="/" element={
          <>
            <h1>React Movie App</h1>
            <button className="theme-btn" onClick={toggleTheme}>
              {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
            {/* SEARCH */}
            <div className="search-bar">
              <div className="search-wrapper" ref={searchRef}>
                <input
                  value={query}
                  onChange={(e) => {
                    const value = e.target.value
                    setQuery(value)

                    if (value.length > 2) {
                      fetch(`https://www.omdbapi.com/?s=${value}&apikey=${apiKey}`)
                        .then(res => res.json())
                        .then(data => {
                          if (data.Search) {
                            setSuggestions(data.Search.slice(0, 7))
                          }
                        })
                    } else {
                      setSuggestions([])
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchMovie()
                    }
                  }}
                  placeholder="Search movies"
                />

                {suggestions.length > 0 && (
                  <div className="suggestions">
                    {suggestions.map((movie) => (
                      <div
                        key={movie.imdbID}
                        className="suggestion-item"
                        onClick={() => {
                          setQuery(movie.Title)
                          setSuggestions([])
                          searchMovie()
                        }}
                      >
                        {movie.Title}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={searchMovie}>Search</button>
            </div>

            {/* FAVORITES (MOVED OUTSIDE) */}
            {favorites.length > 0 && (
              <>
                <h2 style={{ textAlign: "center" }}>Your Favorites</h2>

                <div className="movies-container">
                  {favorites.map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      toggleFavorite={toggleFavorite}
                      isFavorite={true}
                    />
                  ))}
                </div>
              </>
            )}

            {loading && <p className="loading">Loading...</p>}
            {error && <p className="loading">{error}</p>}

            {/* MOVIES */}
            <div className="movies-container fade-in">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  toggleFavorite={toggleFavorite}
                  isFavorite={favorites.some(fav => fav.imdbID === movie.imdbID)}
                />
              ))}
            </div>
          </>
        } />


        {/* DETAILS PAGE */}
        <Route path="/movie/:id" element={<MovieDetails />} />

      </Routes>


    </div>
  )
}

export default App