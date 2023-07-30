import React, {useContext, useEffect, useState} from 'react';
import './ShowGenresHelper.css'
import {Image, Row} from "react-bootstrap";
import Var from "../../API/var";
import Request from "../../API/Request";
import Page from "../../API/Model/Page";
import Loading from "../../Components/Common/Loading/Loading";
import {rand} from "../../Classes/MathHelper";
import GenresViewer from "../../Components/Common/GenresViewer/GenresViewer";
import '../../Shared/Shared.css'
import MessageBox from "../../Components/Common/MesageBox/MessageBox";
import {MessageContext} from "../../Components/Common/MessageContextProvider/MessageContextProvider";

/**
 * this is helper component that handle state for tv's, movies, and both
 * @param showType can be all, movie, tv
 * @param genresPath kgh
 * @returns {JSX.Element}
 * @constructor
 */
const ShowGenresHelper = ({genresPath}) => {
    const [mainImage, setMainImage] = useState(null);
    const [defaultMode, setDefaultMode] = useState(true);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const {message, setMessage} = useContext(MessageContext);

    const imageDefault = {
        poster_path: `${process.env.PUBLIC_URL}/images/default.jpg`,
        original_title: 'Random Movie',
        overview: 'we couldn\'t find a movie, so take that...'
    }

    const getData = async () => {
        const arr = [];

        await Promise.all(
            genresPath?.map(async (path) => {
                const genres = await Request.getRequest(path, undefined);

                const results = await Promise.all(
                    genres?.genres?.map(async (genre) => {
                        const items = await Request.getRequest(Var.getAllFromGenrePath(genre.id), undefined, true);
                        return new Page(genre.name, items?.items);
                    })
                );
                arr.push(...results);
            })
        );

        setData(arr);
    };

    useEffect(() =>{
        if(!defaultMode)
            return;

        try {
            const dataRnd = rand(0, data?.length);
            const itemsRnd = rand(0, data[dataRnd]?.items?.length);
            const image = data[dataRnd]?.items[itemsRnd];

            if(!image)
                throw Error("go to catch");

            setDefaultMode(false);
            setMainImage(image);
        }catch (e){
            setDefaultMode(true);
            setMainImage(imageDefault);
        }

    }, [data]);

    //set main background random image, if not found, set from files
    useEffect(() => {
        setLoading(true);
        getData()
            .then(() => setLoading(false))
            .catch(e => setMessage(e.message));
    }, []);

    return (
        <>
            <div className="container-fluid p-0 m-0">
                <Row className="h-85 dark-color">
                    <Image src={defaultMode ? mainImage?.poster_path : Var.getPosterPath(mainImage?.poster_path)}/>
                </Row>

                <Row className="mt-n5 ms-3 me-3 text-light mb-3 p-2">
                    <div className="half-dark col-lg-4 rounded-3">
                        <h1>{mainImage?.original_title}</h1>
                        <p className="">
                            {mainImage?.overview}
                        </p>
                    </div>
                </Row>


                <div className="container-fluid p-0 dark-color">
                    <Loading dep={loading}/>
                    <Row className="ms-lg-2 ms-md-1 ms-sm-0 me-lg-2 me-md-1 me-sm-0">
                        <GenresViewer data={data}/>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default ShowGenresHelper;
