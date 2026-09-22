import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../js/service/movieService";

import "../css/Favourites.css";

function Favourites() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        loadFavourites();
    }, []);

    const loadFavourites = async () => {

        const data = await getMovies();

        const favouriteMovies = data.filter(
            (movie) => movie.favourite === true
        );

        setMovies(favouriteMovies);
    };

    return (
        <div className="favourites-page">

            <div className="favourites-container">

                <h1>❤️ My Favourite Movies</h1>

                <Link to="/">
                    <button className="add-movie-btn">
                        ⬅️ Back to Movies
                    </button>
                </Link>

                {movies.length === 0 ? (

                    <h2 className="no-favourites">
                        🤍 No favourite movies yet
                    </h2>

                ) : (

                    <div className="favourite-grid">

                        {movies.map((movie) => (

                            <div
                                className="favourite-card"
                                key={movie.id}
                            >

                                {/* MOVIE POSTER */}
                                <div className="favourite-poster-container">

                                    <img
                                        src={movie.image}
                                        alt={movie.title}
                                        className="favourite-poster"
                                    />

                                </div>


                                {/* MOVIE INFORMATION */}
                                <div className="favourite-content">

                                    <h2>
                                        {movie.title}
                                    </h2>

                                    <p>
                                        <strong>Genre:</strong>{" "}
                                        {movie.genre}
                                    </p>

                                    <p>
                                        <strong>Language:</strong>{" "}
                                        {movie.language}
                                    </p>

                                    <p>
                                        <strong>Year:</strong>{" "}
                                        {movie.releaseYear}
                                    </p>

                                    <p>
                                        <strong>Duration:</strong>{" "}
                                        {movie.duration} minutes
                                    </p>

                                    <p className="favourite-rating">
                                        ⭐ {movie.rating}
                                    </p>

                                    <p className="favourite-status">
                                        ❤️ Favourite
                                    </p>

                                    <Link to={`/movie/${movie.id}`}>
                                        <button className="favourite-details-btn">
                                            🎬 View Details
                                        </button>
                                    </Link>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Favourites;