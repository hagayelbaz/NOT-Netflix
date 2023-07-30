import {BrowserRouter, Route, Routes} from 'react-router-dom';

import './Main.css'
import AboutPage from "../Pages/AboutPage/AboutPage";
import HomePage from "../Pages/HomePage/HomePage";
import Error from "../Pages/ErrorPage/ErrorPage";
import MenuBar from "../Components/MenuBar/MenuBar";
import TVPage from "../Pages/TVPage/TVPage";
import MoviesPage from "../Pages/MoviesPage/MoviesPage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import DiscoverPage from "../Pages/DiscoverPage/DiscoverPage";
import PayPage from "../Pages/PayPage/PayPage";
import ThankYouPage from "../Pages/ThankYouPage/ThankYouPage";


/**
 * main - handle the routes option
 * @returns {JSX.Element}
 * @constructor
 */
const Main = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MenuBar />}>
                    <Route index element={<HomePage />} />
                    <Route path="home" element={<HomePage />} />
                    <Route path="tv" element={<TVPage />} />
                    <Route path="movies" element={<MoviesPage />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="discover" element={<DiscoverPage />} />
                    <Route path="pay-page" element={<PayPage />} />
                    <Route path="thank-you" element={<ThankYouPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>

    );
};

export default Main;
