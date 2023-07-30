import React, {useContext, useEffect, useState} from "react";
import './ShoppingModal.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Card, Modal} from "react-bootstrap";
import axios from "axios";
import Var from "../../../API/var";
import {RenderContext} from "../CardContextProvider/CardContextProvider";
import {useNavigate} from "react-router-dom";
import MessageBox from "../MesageBox/MessageBox";
import {MessageContext} from "../MessageContextProvider/MessageContextProvider";


const ShoppingModal = ({show, closeModal, onApply}) => {
    const [data, setData] = useState(null);
    const [sum, setSum] = useState(0);
    const {render, setRender} = useContext(RenderContext);
    const navigate = useNavigate();
    const {message, setMessage} = useContext(MessageContext);

    const handleBuy = () =>{
        closeModal();
        navigate('/pay-page');
    };

    const handleCancel = (movie) =>{
        axios.delete('/cards', {params: {id: movie?.id}})
            .then(() => setRender(render +1))
            .catch(e => setMessage(e.message));
    };

    const handleEmpty = () =>{
        axios.delete('/empty', )
            .then(() => setRender(render +1))
            .catch(e => setMessage(e.message));
    }

    useEffect(() =>{
        let _sum = 0;
        data?.forEach(v => _sum += v?.price);
        setSum(_sum.toFixed(2));
    }, [data]);

    useEffect(() => {
        axios("/cards")
            .then(res => setData(res.data))
            .catch(e => setMessage(e.message));
    }, [render]);


    return (
        <Modal show={show} onHide={closeModal}>
            <Card className="border-2 dark-color border-light text-light rounded-1">
                <FontAwesomeIcon role="button" icon={faCircleXmark} className="position-absolute fa-2x top-0 end-0 m-3"
                                 onClick={closeModal}/>

                <div className="dark-color mt-2">
                    <Card.Header className="display-6">Your Cart</Card.Header>

                    <hr className="mb-0"/>

                    <Card.Body>

                        {!data?.length && (
                            <p className="display-6">Your Cart Empty...</p>
                        )}

                        {data?.length > 0 && (
                            <div className="mb-3" style={{textAlign: 'right'}}>
                                <button onClick={handleEmpty} className="empty-card p-1 ps-2 pe-2">Empty</button>
                            </div>
                        )}

                        <div style={{overflowY: 'auto', maxHeight: '300px'}}>
                            {data?.map((item, key) => {
                                return (
                                    <div key={key} className="mb-2 me-2 p-2 text-light card-border">
                                        <div className="container-fluid">
                                            <div className="row" style={{ display: 'flex', alignItems: 'flex-start' }}>
                                                <div className="col" style={{ maxWidth: '100px', flexBasis: 'auto' }}>
                                                    <img src={Var.getPosterPath(item.poster_path)} className="card-img-top"
                                                         alt="Movie Poster" style={{width: '100px', height: '150px'}}/>
                                                </div>
                                                <div className="col ms-2 d-flex flex-column justify-content-between" style={{height: '150px'}}>
                                                    <h5>{item?.original_title}</h5>
                                                    <div>
                                                        <p className="mb-1">Released at:&nbsp;
                                                            <span className="text-muted">{item?.release_date}</span>
                                                        </p>
                                                        <p className="p-0 mt-0">Price:&nbsp;
                                                            <span className="text-success">{item?.price}$</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-1">
                                                    <FontAwesomeIcon className="cancel-icon"
                                                                     onClick={() => handleCancel(item)}
                                                                     icon={faTimes} role="button"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Card.Body>

                    <hr/>

                    <Card.Footer className="pt-0 pb-0">
                        <p className="fw-bold">Total payment:
                            <span className="text-success"> {sum}$ </span>
                        </p>
                    </Card.Footer>

                    <hr/>

                    <Card.Footer className="d-flex justify-content-center mb-3">
                        <button disabled={!data?.length}
                                onClick={handleBuy}
                                className="custom-btn bg-white border-0 p-3 ps-5 pe-5 text-dark rounded-3">Pay Now</button>
                    </Card.Footer>

                </div>
            </Card>
        </Modal>
    );
}

export default ShoppingModal;