const API_URL = "http://localhost:3000/movies";

// Get all movies
export const getMovies = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

// Get movie by ID
export const getMovieById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return await response.json();
};

// Add movie
export const addMovie = async (movie) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movie)
    });

    return await response.json();
};

// Update movie
export const updateMovie = async (id, movie) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movie)
    });

    return await response.json();
};

// Delete movie
export const deleteMovie = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
};