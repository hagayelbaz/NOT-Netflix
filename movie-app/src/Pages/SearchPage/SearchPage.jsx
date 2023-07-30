import React, {useContext, useEffect, useState} from "react";
import './SearchPage.css'
import {useSearchParams} from "react-router-dom";
import Request from "../../API/Request";
import Loading from "../../Components/Common/Loading/Loading";
import ShowItem from "../../API/Model/Page";
import {Row} from "react-bootstrap";
import Var from "../../API/var";
import GenresViewer from "../../Components/Common/GenresViewer/GenresViewer";
import '../../Shared/Shared.css'
import {MessageContext} from "../../Components/Common/MessageContextProvider/MessageContextProvider";


const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const {message, setMessage} = useContext(MessageContext);


    useEffect(() => {

        const getData = async () => {
            setLoading(true);
            const params = {
                query: query,
            };

            const res = await Request.getRequest(Var.getSearchMoviePath(), params);
            setData([new ShowItem('Search Result', res.results)]);
            setLoading(false);
        }

        getData().catch(e => setMessage(e.message));
    }, [query]);


    return (
        <>
            <div className="text-light container-fluid p-0 dark-color vh-100">
                <Row className="to-center">
                    <Loading dep={loading}/>
                    <h1 className="mt-3 ms-sm-1 ms-md-3">Result for: {query}</h1>
                    <Row className="ms-lg-2 ms-md-1 ms-sm-0 me-lg-2 me-md-1 me-sm-0">
                        <GenresViewer data={data}/>
                    </Row>
                </Row>
            </div>

        </>
    );
}

export default SearchPage;