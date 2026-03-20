function MovieCard({ movie }) {

  const poster =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/150"

  return (
    <div style={{
      background: "#2c2c40",
      margin: "10px",
      padding: "10px",
      borderRadius: "10px",
      width: "150px"
    }}>

      <img src={poster} style={{ width: "100%" }} />

      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>

    </div>
  )
}

export default MovieCard