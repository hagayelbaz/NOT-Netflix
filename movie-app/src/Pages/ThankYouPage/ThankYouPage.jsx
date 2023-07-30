import React from "react";
import './ThankYouPage.css'
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const ThankYouPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    }

    return (
        <div className="text-light d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <div className="text-center">
                <h1 className="display-3">Thank you for choosing us!</h1>
                <h1 className="display-3"> Your purchase will bring you great satisfaction, we're certain of it.</h1>
                <Button className="mt-5 custom-btn bg-white border-0 p-3 ps-5 pe-5 text-dark" onClick={handleGoHome}>
                    Back Home
                </Button>
            </div>
        </div>

    );
}


export default ThankYouPage;