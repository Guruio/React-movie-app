import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



function MovieDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=44517455&i=${id}`)
      .then(res => res.json())
      .then(data => setMovie(data))
  }, [id])

  if (!movie) return <p>Loading...</p>
return (
  
  <div className="details-page">

    {/* HERO SECTION */}
   <div className="hero">

  {/* BACKGROUND IMAGE */}
  <div
    className="hero-bg"
    style={{ backgroundImage: `url(${movie.Poster})` }}
  ></div>

  {/* CONTENT */}
  <div className="overlay fade-in">

    <button className="back-btn" onClick={() => navigate(-1)}>
      ← Back
    </button>

    <div className="hero-content">
      <img src={movie.Poster} alt={movie.Title} />

      <div>
        <h1>{movie.Title}</h1>
        <p><strong>Year:</strong> {movie.Year}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p>{movie.Plot}</p>
      </div>
    </div>

  </div>
</div>

  </div>
)}

export default MovieDetails