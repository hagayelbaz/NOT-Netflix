import React, {useContext, useEffect, useState} from "react";
import './DiscoverPage.css'
import '../../Shared/Shared.css'
import {Col, Dropdown, FormSelect, Row} from "react-bootstrap";
import Request from "../../API/Request";
import Loading from "../../Components/Common/Loading/Loading";
import Var from "../../API/var";
import Page from "../../API/Model/Page";
import GenresViewer from "../../Components/Common/GenresViewer/GenresViewer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import FilterModal from "../../Components/Common/FilterModal/FilterModal";
import MessageBox from "../../Components/Common/MesageBox/MessageBox";
import {MessageContext} from "../../Components/Common/MessageContextProvider/MessageContextProvider";



const DiscoverPage = () => {
    const PAGES_TO_SHOW = 4; //actually 3
    const [selectedText, setSelectedText] = useState('Select Genre');
    const [isSelect, setIsSelect] = useState(false);
    const [categories, setCategories] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [advanceFilter, setAdvanceFilter] = useState(null);
    const {message, setMessage} = useContext(MessageContext);

    const closeModal = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        const run = async () => {
            const val = await Request.getRequest(Var.getMovieGenresPath(), undefined);
            return val.genres;
        };

        run()
            .then(setCategories)
            .catch(e => setMessage(e.message));
    }, []);

    useEffect(() => {
        if(advanceFilter)
            handleSelection(selectedText);
    }, [advanceFilter])

    const handleSelection = (e) => {
        setLoading(true);
        setIsSelect(true);
        setSelectedText(e);
        setData(null);

        const getData = async (page) => {
            const filter = {
                with_genres: categories.find(x => x.name === e).id,
                page: page,
                ...advanceFilter
            }

            const dt = await Request.getRequest(Var.getDiscoverMoviePath(), filter);
            const item = new Page(`🎬`, dt.results);
            setData(prevData => prevData ? [...prevData, item] : [item]);
            setLoading(false);
        }

        for (let i = 1; i < PAGES_TO_SHOW; i++) {
            getData(i).catch(e => setMessage(e.message));
        }

    };

    return (
        <div className="text-light container-fluid p-0 dark-color vh-100">
            <FilterModal show={isModalOpen} closeModal={closeModal} onApply={(f) => setAdvanceFilter(f)}/>

            <div className="container pt-7 ps-5">
                <div className="row align-items-center">
                    <div className="col d-flex align-items-center">
                        <div className="container-fluid">
                            <Loading dep={loading}/>

                            {isSelect && (
                                <div className="row">
                                    <div className="d-flex align-items-center col">
                                        <p className="me-3 m-0 h-btn" role="button"
                                           onClick={() => setIsSelect(false)}>Genre > </p>
                                        <h1 className="m-0">{selectedText}</h1>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-end col">
                                        <FontAwesomeIcon icon={faFilter} role="button"
                                                         onClick={() => setIsModalOpen(true)}/>
                                    </div>
                                </div>

                            )}

                            {!isSelect && (
                                <div className="">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <h1 className="me-3">Genre: </h1>
                                        </div>
                                        <Dropdown onSelect={handleSelection}>
                                            <Dropdown.Toggle className="dark-color" variant="dark">
                                                {selectedText}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dark-color" variant="dark">
                                                {categories?.map((item, key) => {
                                                    return (
                                                        <div key={key}>
                                                            <Dropdown.Item
                                                                eventKey={item.name}>{item.name}</Dropdown.Item>
                                                        </div>
                                                    )
                                                })}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            )}

                            <hr/>

                            <div className="row mt-5">
                                <GenresViewer data={data}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default DiscoverPage;