import React from 'react';
import './TV.css'
import Var from "../../API/var";
import ShowGenresHelper from "../ShowGenresHelper/ShowGenresHelper";


/**
 * show the page for only tv's
 * @returns {JSX.Element}
 * @constructor
 */
const TVPage = () => {
    const path = Var.getTvGenresPath();

    return (
        <ShowGenresHelper genresPath={[path]}/>
    );
};

export default TVPage;
