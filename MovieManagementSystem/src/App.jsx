import { BrowserRouter, Routes, Route } from "react-router-dom";

import MovieList from "./views/MovieList";
import AddMovie from "./views/AddMovie";
import EditMovie from "./views/EditMovie";
import MovieDetails from "./views/MovieDetails";
import Favourites from "./views/Favourites";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<MovieList />}
                />

                <Route
                    path="/add"
                    element={<AddMovie />}
                />

                <Route
                    path="/edit/:id"
                    element={<EditMovie />}
                />

                <Route
                    path="/movie/:id"
                    element={<MovieDetails />}
                />

                <Route
                    path="/favourites"
                    element={<Favourites />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;