import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getMovieById } from "../js/service/movieService";

import "../css/MovieDetails.css";

function MovieDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        loadMovie();
    }, [id]);

    const loadMovie = async () => {

        const data = await getMovieById(id);

        setMovie(data);
    };

    if (!movie) {

        return (
            <div className="details-loading">
                🎬 Loading movie...
            </div>
        );
    }

    return (

        <div className="movie-details-page">

            <div className="movie-details-card">

                {/* Poster */}

                <div className="details-poster-container">

                    <img
                        src={movie.image}
                        alt={movie.title}
                        className="details-poster"
                    />

                </div>


                {/* Movie Information */}

                <div className="details-content">

                    <p className="details-label">
                        MOVIE DETAILS
                    </p>

                    <h1>
                        {movie.title}
                    </h1>

                    <div className="details-rating">
                        ⭐ {movie.rating} / 10
                    </div>


                    <div className="details-divider"></div>


                    <div className="details-info">

                        <div className="info-item">

                            <span>🎭 Genre</span>

                            <strong>
                                {movie.genre}
                            </strong>

                        </div>


                        <div className="info-item">

                            <span>🌎 Language</span>

                            <strong>
                                {movie.language}
                            </strong>

                        </div>


                        <div className="info-item">

                            <span>📅 Release Year</span>

                            <strong>
                                {movie.releaseYear}
                            </strong>

                        </div>


                        <div className="info-item">

                            <span>⏱️ Duration</span>

                            <strong>
                                {movie.duration} minutes
                            </strong>

                        </div>


                        <div className="info-item">

                            <span>❤️ Favourite</span>

                            <strong>
                                {movie.favourite
                                    ? "Yes"
                                    : "No"}
                            </strong>

                        </div>

                    </div>


                    {/* Back Button */}

                    <button
                        className="details-back-btn"
                        onClick={() => navigate("/")}
                    >
                        ⬅️ Back to Movies
                    </button>

                </div>

            </div>

        </div>
    );
}

export default MovieDetails;