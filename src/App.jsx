import { useState } from "react"
import MovieCard from "./moviecard"

function App() {

  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
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
  return (
    <div style={{ textAlign: "center" }}>

      <h1>React Movie App</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchMovie()
          }
        }}
        placeholder="Search movies"
      />

      <button onClick={searchMovie}>Search</button>
      {loading && <p>Loading...</p>}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "20px",
        padding: "20px"

      }}>
        {error && <p>{error}</p>}

        {movies.map((movie, index) => (
          movie && <MovieCard key={index} movie={movie} />
        ))}

      </div>

    </div>
  )
}
export default App