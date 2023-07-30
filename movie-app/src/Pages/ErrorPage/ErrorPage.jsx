import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Container} from "react-bootstrap";
import './ErrorPage.css'

/**
 * error page
 * @returns {JSX.Element}
 * @constructor
 */
const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    }

    return (
        <div style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + '/images/404Image.jpg'})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            color: "white",
            minHeight: "100vh",
            padding: "3rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Container className="text-center">
                <h1 className="mb-4">Uh-oh, we can't find that page!</h1>
                <p className="mb-4">You seem to have ended up somewhere that doesn't exist. Not to worry, though. We can help you find your way back.</p>
                <Button className="custom-btn bg-white border-0 p-3 ps-5 pe-5 text-dark" onClick={handleGoHome}>NOT NETFLIX Home Page</Button>
            </Container>
        </div>
    );
};

export default ErrorPage;
