import React from 'react';
import './MoviesPage.css'
import ShowGenresHelper from "../ShowGenresHelper/ShowGenresHelper";
import Var from "../../API/var";



/**
 * movie page
 * @returns {JSX.Element}
 * @constructor
 */
const MoviesPage = () => {
    const path = Var.getMovieGenresPath();

    return (
        <ShowGenresHelper genresPath={[path]}/>
    );
};

export default MoviesPage;
