import React, {useContext, useEffect, useState} from "react";
import './PayPage.css'
import axios from "axios";
import {Button, Form} from "react-bootstrap";
import '../../Shared/Shared.css'
import {RenderContext} from "../../Components/Common/CardContextProvider/CardContextProvider";
import {useNavigate} from "react-router-dom";
import MessageBox from "../../Components/Common/MesageBox/MessageBox";
import {MessageContext} from "../../Components/Common/MessageContextProvider/MessageContextProvider";

const PayPage = () => {
    const {render, setRender} = useContext(RenderContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [payment, setPayment] = useState('');
    const {message, setMessage} = useContext(MessageContext);
    const navigate = useNavigate();

    useEffect(() =>{
        const getData = async () => {
            const res = await axios("/cards");
            if(!res?.data?.length > 0)
                navigate("/");
        }

        getData().catch(e => setMessage(e.message));
    },[]);

    useEffect(() =>{
        const getData = async () => {
            const res = await axios("/cards");
            let _sum = 0;
            res?.data?.forEach(v => _sum += v?.price);
            setPayment(_sum.toFixed(2));
        }

        getData().catch(e => setMessage(e.message));
    },[render]);

    const afterBuy = () =>{
        axios.delete('/empty').then(() => setRender(render +1))
            .catch(e => setMessage(e.message))
            .finally(() => navigate('/thank-you'));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const purchaseData = {
            firstName,
            lastName,
            email,
            payment
        };

        axios.post('purchase', purchaseData)
            .then(afterBuy)
            .catch(e => setMessage(e.message));
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="w-75">
                <div className="mb-xl-5">
                    <h1 className="text-center text-light">Thank you for choosing us!</h1>
                    <h1 className="text-center text-light">Please complete the payment form below to finalize your purchase.</h1>
                </div>

                <div className="form-bg rounded-3">
                    <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '900px' }}>
                        <div className="form-control-holder">
                            <input type="text" name="firstName" className="form-input" placeholder=" "
                                   pattern="[A-Za-z\s]+"
                                   onChange={(e) => setFirstName(e.target.value)}
                                   title="Please enter only letters" required/>
                            <label htmlFor="firstName" className="form-label">First Name</label>
                        </div>

                        <div className="form-control-holder">
                            <input type="text" name="lastName" className="form-input" placeholder=" "
                                   pattern="[A-Za-z\s]+"
                                   onChange={(e) => setLastName(e.target.value)}
                                   title="Please enter only letters" required/>
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                        </div>

                        <div className="form-control-holder">
                            <input type="email" name="email" className="form-input" placeholder=" "
                                   pattern=".+"
                                   onChange={(e) => setEmail(e.target.value)} required/>
                            <label htmlFor="email" className="form-label">Email</label>
                        </div>

                        <div className="text-light mt-5">
                            Total pay: <span className="text-success fw-bold">{payment}$</span>
                        </div>

                        <Button className="custom-btn bg-white border-0 p-3 ps-5 pe-5 text-dark d-block mx-auto mt-4"
                                type="submit">
                            Pay Now
                        </Button>
                    </Form>
                </div>
            </div>
        </div>

    );
}


export default PayPage;