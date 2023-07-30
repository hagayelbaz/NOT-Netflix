import React, {useEffect, useState} from "react";
import './FilterModal.css'
import {Card, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import '../../../Shared/Shared.css'


const FilterModal = ({show, closeModal, onApply}) => {
    const [filter, setFilter] = useState(null);

    const init = {
        'vote_average.gte' : 0,
        include_video : false,
        include_adult: false,
    };

    useEffect(() =>{
        setFilter(init);
    },[show])


    return (
        <Modal show={show} onHide={closeModal}>
            <Card className="border-2 dark-color border-light text-light rounded-1">

                <FontAwesomeIcon role="button" icon={faCircleXmark} className="position-absolute fa-2x top-0 end-0 m-3"
                                 onClick={closeModal}/>

                <div className="dark-color mt-2">
                    <Card.Header className="display-6">Filter Option</Card.Header>

                    <hr/>

                    <Card.Body>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    <label className="me-2">Vote Range (Min): &nbsp; &nbsp; {filter?.['vote_average.gte']}</label>

                                    <input type="range"
                                           defaultValue="0"
                                           className="form-range"
                                           min="0" max="9"
                                           onInput={e => setFilter(pre => ({
                                               ...pre,
                                               "vote_average.gte": e.target.value
                                           }))}/>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <input type="checkbox" role="button" className="me-2 form-check-input"
                                           onChange={e => setFilter(pre => ({
                                               ...pre,
                                               "include_adult": e.target.checked
                                           }))}/>

                                    <label className="">Include adult</label>
                                </div>

                                <div className="col">
                                    <input type="checkbox" role="button" className="me-2 form-check-input"
                                           onChange={e => setFilter(pre => ({
                                               ...pre,
                                               "include_video": e.target.checked
                                           }))}/>

                                    <label className="">Include video</label>
                                </div>
                            </div>

                        </div>
                    </Card.Body>

                    <hr/>

                    <Card.Footer className="d-flex justify-content-center mb-3">
                        <button className="custom-btn bg-white border-0 p-3 ps-5 pe-5 text-dark rounded-3"
                                onClick={() => {
                                    onApply(filter);
                                    closeModal();
                                }}>Apply</button>
                    </Card.Footer>
                </div>
            </Card>
        </Modal>
    );
}


export default FilterModal;