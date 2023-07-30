import React from 'react';
import './HomePage.css'
import ShowGenresHelper from "../ShowGenresHelper/ShowGenresHelper";
import Var from "../../API/var";

/**
 * home page
 * @returns {JSX.Element}
 * @constructor
 */
const HomePage = () => {
    const path = [Var.getMovieGenresPath(), Var.getTvGenresPath()];

    return (
        <ShowGenresHelper genresPath={path}/>
    );
};

export default HomePage;
