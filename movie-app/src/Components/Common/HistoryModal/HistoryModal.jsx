import React, {useContext} from "react";
import './HistoryModal.css'
import '../../../Shared/Shared.css'
import {Card, Modal} from "react-bootstrap";
import {HistoryContext} from "../HistoryContextProvider/HistoryContextProvider";
import {useNavigate} from "react-router-dom";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const HistoryModal = ({show, closeModal}) => {
    const {history, setHistory} = useContext(HistoryContext);
    const navigate = useNavigate();

    const handleSelection = (value) => {
        closeModal();
        navigate(`/search?query=${value}`);
    };

    const handleClear = () => {
        setHistory([]);
    }

    const handleDelete = (e, value) => {
        e.stopPropagation();
        const newHistory = history?.filter(v => v !== value);
        setHistory(newHistory);
    }

    return (
        <Modal show={show} onHide={closeModal}>
            <Card className="dark-color text-light rounded-3 border-light border-3">
                <FontAwesomeIcon role="button" icon={faCircleXmark} className="position-absolute fa-2x top-0 end-0 m-3"
                                 onClick={closeModal}/>

                <Card.Header className="dark-color text-light">
                    <h1 className="display-6">History</h1>
                </Card.Header>

                <hr/>

                <Card.Body className="dark-color" style={{maxHeight: '300px', overflowY: 'auto'}}>
                    {history.length > 0 && (
                        <div className="mb-3" style={{textAlign: 'right'}}>
                            <button onClick={handleClear} className="m-1 clear-history p-1 ps-2 pe-2">Empty</button>
                        </div>
                    )}

                    <ul className="list-group dark-color">
                        {history?.map((h, index) => (
                            <li key={index} role="button"
                                onClick={() => handleSelection(h)}
                                className="m-1 border-1 border-light list-group-item dark-color text-light history-item rounded-3 d-flex justify-content-between">
                                {h}
                                <FontAwesomeIcon onClick={(event) => handleDelete(event, h)} icon={faCircleXmark}
                                                 className="m-1 cancel-icon"/>
                            </li>

                        ))}
                    </ul>
                </Card.Body>


            </Card>
        </Modal>
    );
}

export default HistoryModal;