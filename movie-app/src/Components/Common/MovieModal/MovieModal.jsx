
import React, {useContext, useEffect, useState} from "react";
import {Card, Col, Container, Modal, Row} from "react-bootstrap";
import Var from "../../../API/var";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faPlusCircle, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import './MovieModal.css'
import axios from "axios";
import {RenderContext} from  '../CardContextProvider/CardContextProvider'
import MessageBox from "../MesageBox/MessageBox";
import {MessageContext} from "../MessageContextProvider/MessageContextProvider";

/**
 * modal for show all the movie details
 * @param movie the movie object
 * @param show bool, if the modal open
 * @param closeModal handle the close, a function
 * @param initIsOpen
 * @returns {JSX.Element}
 * @constructor
 */

const MovieModal = ({movie, show, closeModal, isBought, setIsBought}) =>{
    const {render, setRender} = useContext(RenderContext);
    const {message, setMessage} = useContext(MessageContext);

    const handleClick = () => {
        const ren = (_isBought) =>{
            setRender(render +1);
            setIsBought(_isBought);
        };

        const cardData = {
            price : movie?.price,
            ...movie,
        }

        if(!isBought)
            axios.post('/cards', cardData)
                .then(() => ren(true))
                .catch(e => setMessage(e.message));
        else
            axios.delete('/cards', {params: {id: movie?.id}})
                .then(() => ren(false))
                .catch(e => setMessage(e.message));
    };

    return(
        <Modal show={show} onHide={closeModal}>
            <Card className="dark-CC text-light rounded-3">
                <div className="position-relative">

                    <Card.Img src={Var.getPosterPath(movie.poster_path)} className="card-img-top" alt="Movie Poster" />

                    <div className="position-absolute bottom-0 end-0 m-2 dark-CC rounded-3 d-flex align-items-center justify-content-center">
                        <Container>
                            <Row className="p-3">
                                <Col className="d-flex align-items-center justify-content-center">
                                    <p className="text-nowrap mb-0">Add To List</p>
                                </Col>
                                <Col className="d-flex align-items-center justify-content-center">
                                    <div onClick={handleClick} className="icon-container">
                                        <FontAwesomeIcon
                                            icon={isBought ? faMinusCircle : faPlusCircle}
                                            role="button"
                                            className="display-6 icon"
                                            onClick={handleClick}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>

                    <div className="position-absolute bottom-0 start-0 m-2 dark-CC rounded-3 d-flex align-items-center justify-content-center">
                        <Container>
                            <Row className="p-1">
                                <Col className="d-flex align-items-center justify-content-center">
                                    <p className="text-nowrap mb-0">price:
                                        <span className="text-success fw-bold">&nbsp;{movie?.price}$</span>
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </div>

                </div>

                <FontAwesomeIcon role="button" icon={faCircleXmark} className="position-absolute fa-2x top-0 end-0 m-3" onClick={closeModal} />

                <div className="dark-CC">
                    <Card.Header>{movie?.original_title}</Card.Header>
                    <Card.Body>{movie?.overview}</Card.Body>
                    <Card.Footer>
                        <p className="text-secondary m-0 p-0">
                            Rate:&nbsp;
                            <span className="text-success fw-bold">{movie?.vote_average}</span>
                        </p>
                        <p className="text-secondary m-0 p-0">
                            Release date:&nbsp;
                            <span className="text-light">{movie?.release_date}</span>
                        </p>
                    </Card.Footer>
                </div>
            </Card>
        </Modal>
    );
}

export default MovieModal;