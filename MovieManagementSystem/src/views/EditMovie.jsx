import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getMovieById,
    updateMovie
} from "../js/service/movieService";

import "../css/EditMovie.css";

function EditMovie() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState({
        title: "",
        genre: "",
        language: "",
        releaseYear: "",
        duration: "",
        rating: "",
        image: ""
    });

    // Load movie from json-server
    useEffect(() => {
        loadMovie();
    }, []);

    const loadMovie = async () => {
        const data = await getMovieById(id);

        setMovie({
            title: data.title || "",
            genre: data.genre || "",
            language: data.language || "",
            releaseYear: data.releaseYear || "",
            duration: data.duration || "",
            rating: data.rating || "",
            image: data.image || ""
        });
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setMovie({
            ...movie,
            [name]: value
        });
    };

    // Update movie
    const handleSubmit = async (e) => {
        e.preventDefault();

        await updateMovie(id, {
            ...movie,
            releaseYear: Number(movie.releaseYear),
            duration: Number(movie.duration),
            rating: Number(movie.rating)
        });

        alert("Movie updated successfully!");

        navigate("/");
    };

    return (
        <div className="edit-movie-page">

            <div className="edit-movie-card">

                <h1>✏️ Edit Movie</h1>

                <div className="edit-movie-content">

                    {/* Movie Poster */}
                    <div className="edit-poster-section">

                        {movie.image ? (
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="edit-movie-poster"
                            />
                        ) : (
                            <div className="no-poster">
                                🎬
                                <span>No Poster</span>
                            </div>
                        )}

                    </div>

                    {/* Edit Form */}
                    <form onSubmit={handleSubmit}>

                        <div className="edit-field">
                            <label>Movie Title</label>

                            <input
                                type="text"
                                name="title"
                                value={movie.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="edit-field">
                            <label>Genre</label>

                            <input
                                type="text"
                                name="genre"
                                value={movie.genre}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="edit-field">
                            <label>Language</label>

                            <input
                                type="text"
                                name="language"
                                value={movie.language}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="edit-field">
                            <label>Release Year</label>

                            <input
                                type="number"
                                name="releaseYear"
                                value={movie.releaseYear}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="edit-field">
                            <label>Duration (minutes)</label>

                            <input
                                type="number"
                                name="duration"
                                value={movie.duration}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="edit-field">
                            <label>Rating</label>

                            <input
                                type="number"
                                step="0.1"
                                name="rating"
                                value={movie.rating}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="edit-update-btn"
                        >
                            💾 Update Movie
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default EditMovie;