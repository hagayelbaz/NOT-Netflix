import React from "react";
import './GenresViewer.css'
import {Row} from "react-bootstrap";
import MovieSlider from "../MovieSlider/MovieSlider";


const GenresViewer = ({data}) => {
    return(
        <>
            {data?.map((item, key) => (
                <div key={key} className="mt-lg-2 mt-sm-1">
                    <Row>
                        <h2 className="text-light">{item?.items?.length > 0 ? item?.genre : ''}</h2>
                    </Row>
                    <Row>
                        <MovieSlider movies={item?.items}/>
                    </Row>
                </div>
            ))}
        </>
    )
}

export default GenresViewer;