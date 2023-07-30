import React, {Fragment} from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import './MovieSlider.css'

/**
 * a movie responsive slider
 * @param movies the data...
 * @returns {JSX.Element}
 * @constructor
 */
const MovieSlider = ({movies}) => {

    const responsive = {
        superLargeDesktop: {
            breakpoint: {max: 4000, min: 3000},
            items: 12
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 8
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 4
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 3
        }
    };

    return (
        <div>
            <Carousel responsive={responsive}
                      slidesToSlide={3}
                      swipeable={false}
                      draggable={false}
                      infinite={true}
            >
                {movies ? movies?.map((movie, key) =>
                        movie.poster_path && (
                            <div key={key}>
                                <MovieCard movie={movie}/>
                            </div>
                        )
                ) : <Fragment/>}
            </Carousel>
        </div>
    );
};

export default MovieSlider;
