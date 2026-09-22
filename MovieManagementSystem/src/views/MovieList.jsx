
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getMovies,
    deleteMovie,
    updateMovie
} from "../js/service/movieService";

import "../css/MovieList.css";

function MovieList() {

    const [movies, setMovies] = useState([]);

    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("All");
    const [sort, setSort] = useState("none");

    useEffect(() => {
        loadMovies();
    }, []);

    // Get all movies
    const loadMovies = async () => {

        const data = await getMovies();

        setMovies(data);
    };

    // Delete movie
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this movie?"
        );

        if (!confirmDelete) {
            return;
        }

        await deleteMovie(id);

        alert("Movie deleted successfully!");

        loadMovies();
    };

    // Favourite / Unfavourite
    const handleFavourite = async (movie) => {

        await updateMovie(movie.id, {
            ...movie,
            favourite: !movie.favourite
        });

        loadMovies();
    };

    // Search
    let filteredMovies = movies.filter((movie) =>
        movie.title
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // Genre filter
    if (genre !== "All") {

        filteredMovies = filteredMovies.filter(
            (movie) => movie.genre === genre
        );
    }

    // Sort by rating
    if (sort === "high") {

        filteredMovies.sort(
            (a, b) => b.rating - a.rating
        );
    }

    if (sort === "low") {

        filteredMovies.sort(
            (a, b) => a.rating - b.rating
        );
    }

    return (

        <div className="movie-container">

            {/* Header */}

            <header className="movie-header">

                <h1>🎬 MovieHub</h1>

                <p>
                    Discover your favourite movies
                </p>

            </header>


            {/* Navigation */}

            <div className="movie-navigation">

                <Link to="/add">

                    <button className="add-movie-btn">
                        ➕ Add Movie
                    </button>

                </Link>

                <Link to="/favourites">

                    <button className="favourite-page-btn">
                        ❤️ Favourites
                    </button>

                </Link>

            </div>


            {/* Search and Filters */}

            <div className="movie-controls">

                <input
                    type="text"
                    placeholder="🔍 Search movies..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />


                <select
                    value={genre}
                    onChange={(e) =>
                        setGenre(e.target.value)
                    }
                >

                    <option value="All">
                        🎭 All Genres
                    </option>

                    <option value="Sci-Fi">
                        Sci-Fi
                    </option>

                    <option value="Action">
                        Action
                    </option>

                    <option value="Drama">
                        Drama
                    </option>

                    <option value="Comedy">
                        Comedy
                    </option>

                </select>


                <select
                    value={sort}
                    onChange={(e) =>
                        setSort(e.target.value)
                    }
                >

                    <option value="none">
                        ⭐ Sort by Rating
                    </option>

                    <option value="high">
                        Highest Rating
                    </option>

                    <option value="low">
                        Lowest Rating
                    </option>

                </select>

            </div>


            {/* Movie Grid */}

            <div className="movie-grid">

                {filteredMovies.length === 0 ? (

                    <h2 className="no-movies">
                        😕 No movies found
                    </h2>

                ) : (

                    filteredMovies.map((movie) => (

                        <div
                            className="movie-card"
                            key={movie.id}
                        >

                            {/* Movie Poster */}

                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="movie-poster"
                            />


                            {/* Favourite Heart */}

                            <button
                                className={`favourite-btn ${
                                    movie.favourite
                                        ? "favourite-active"
                                        : ""
                                }`}
                                onClick={() =>
                                    handleFavourite(movie)
                                }
                                title={
                                    movie.favourite
                                        ? "Remove from favourites"
                                        : "Add to favourites"
                                }
                            >
                                {movie.favourite ? "♥" : "♡"}
                            </button>


                            {/* Movie Information */}

                            <div className="movie-info">

                                <h2>
                                    {movie.title}
                                </h2>

                                <p className="movie-rating">
                                    ⭐ {movie.rating}
                                </p>


                                {/* View Details */}

                                <Link
                                    to={`/movie/${movie.id}`}
                                >

                                    <button className="details-btn">
                                        🎬 View Details
                                    </button>

                                </Link>


                                {/* Edit and Delete */}

                                <div className="card-actions">

                                    <Link
                                        to={`/edit/${movie.id}`}
                                    >

                                        <button className="edit-btn">
                                            ✏️ Edit
                                        </button>

                                    </Link>


                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(movie.id)
                                        }
                                    >
                                        🗑️ Delete
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default MovieList;

