import { useNavigate } from 'react-router-dom'

function MovieCard({ movie, toggleFavorite, isFavorite }) {
  const navigate = useNavigate()

  const poster =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/150"

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
    >

      {/* ❤️ FAVORITE BUTTON */}
      <button
        className="fav-btn"
        onClick={(e) => {
          e.stopPropagation()
          toggleFavorite(movie)
        }}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <img src={poster} alt={movie.Title} />

      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
    </div>
  )
}

export default MovieCard