import React, {useContext, useState} from 'react';
import Var from "../../../API/var";
import {Card, CardImg} from "react-bootstrap";
import '../Style/style.css'
import MovieModal from "../MovieModal/MovieModal";
import './MovieCard.css'
import '../../../Shared/Shared.css'
import axios from "axios";
import MessageBox from "../MesageBox/MessageBox";
import {MessageContext} from "../MessageContextProvider/MessageContextProvider";


/**
 * show all single movie in a card
 * with modal when card selected
 * @param movie
 * @returns {JSX.Element}
 * @constructor
 */
const MovieCard = ({movie}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    //this handled here instead of the modal for non rendering a lot of data no reason
    const [isBought, setIsBought] = useState(false);
    const {message, setMessage} = useContext(MessageContext);

    const handleCardClick = () => {
        const getData = async () => {
            axios("/cards", {params: {id: movie?.id}})
                .then(res => setIsBought(res?.data?.length > 0))
                .catch(e => setMessage(e.message));
        };

        getData()
            .catch(e => setMessage(e.message));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <MovieModal movie={movie} show={isModalOpen} closeModal={closeModal} isBought={isBought} setIsBought={setIsBought}/>
            <div className="">
                <Card className="m-1" role="button" onClick={handleCardClick}>
                    <CardImg className="img-fluid rounded" src={Var.getPosterPath(movie.poster_path)}/>
                </Card>
            </div>

        </>
    );
};

export default MovieCard;
