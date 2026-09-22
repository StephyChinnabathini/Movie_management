import { useState } from "react";
import { Link } from "react-router-dom";
import { addMovie, getMovies } from "../js/service/movieService";

import "../css/AddMovie.css";

function AddMovie() {

    const [movie, setMovie] = useState({
        title: "",
        genre: "",
        language: "",
        releaseYear: "",
        duration: "",
        rating: "",
        favourite: false,
        image: ""
    });

    const [imagePreview, setImagePreview] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setMovie({
            ...movie,
            [name]: value
        });
    };

    // Handle movie picture
    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) {
            return;
        }

        // Check if selected file is an image
        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            return;
        }

        // Convert image to a format that can be saved in db.json
        const reader = new FileReader();

        reader.onload = () => {

            setMovie({
                ...movie,
                image: reader.result
            });

            setImagePreview(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Get all existing movies
        const existingMovies = await getMovies();

        // Check for duplicate movie title
        const duplicateMovie = existingMovies.some(
            (existingMovie) =>
                existingMovie.title.trim().toLowerCase() ===
                movie.title.trim().toLowerCase()
        );

        // Stop if duplicate movie is found
        if (duplicateMovie) {
            alert("This movie already exists!");
            return;
        }

        // Add movie if it is not a duplicate
        await addMovie({
            ...movie,
            releaseYear: Number(movie.releaseYear),
            duration: Number(movie.duration),
            rating: Number(movie.rating)
        });

        alert("Movie added successfully!");

        setMovie({
            title: "",
            genre: "",
            language: "",
            releaseYear: "",
            duration: "",
            rating: "",
            favourite: false,
            image: ""
        });

        setImagePreview("");
    };

    return (

        <div className="add-movie-container">

            <div className="add-movie-card">

                <h1>🎬 Add New Movie</h1>

                <p className="form-subtitle">
                    Add a movie to your collection
                </p>

                <form onSubmit={handleSubmit}>

                    {/* Movie Title */}

                    <div className="form-field">

                        <label>Movie Title</label>

                        <input
                            type="text"
                            name="title"
                            placeholder="Enter movie title"
                            value={movie.title}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Genre */}

                    <div className="form-field">

                        <label>Genre</label>

                        <input
                            type="text"
                            name="genre"
                            placeholder="Example: Action, Drama, Sci-Fi"
                            value={movie.genre}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Language */}

                    <div className="form-field">

                        <label>Language</label>

                        <input
                            type="text"
                            name="language"
                            placeholder="Example: English"
                            value={movie.language}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Release Year */}

                    <div className="form-field">

                        <label>Release Year</label>

                        <input
                            type="number"
                            name="releaseYear"
                            placeholder="Example: 2024"
                            value={movie.releaseYear}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Duration */}

                    <div className="form-field">

                        <label>Duration</label>

                        <input
                            type="number"
                            name="duration"
                            placeholder="Duration in minutes"
                            value={movie.duration}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Rating */}

                    <div className="form-field">

                        <label>Rating</label>

                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            name="rating"
                            placeholder="Rating out of 10"
                            value={movie.rating}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Movie Picture */}

                    <div className="form-field image-field">

                        <label>Movie Picture</label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />

                        <p className="image-help">
                            Select a JPG, JPEG or PNG movie poster
                        </p>

                    </div>


                    {/* Image Preview */}

                    {imagePreview && (

                        <div className="image-preview-section">

                            <p>Poster Preview</p>

                            <img
                                src={imagePreview}
                                alt="Movie Preview"
                                className="image-preview"
                            />

                        </div>

                    )}


                    {/* Add Movie Button */}

                    <button
                        type="submit"
                        className="save-movie-btn"
                    >
                        ➕ Add Movie
                    </button>

                </form>


                <Link to="/">

                    <button className="back-btn">
                        ⬅️ Back to Movies
                    </button>

                </Link>

            </div>

        </div>
    );
}

export default AddMovie;