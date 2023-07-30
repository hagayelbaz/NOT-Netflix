import React, {useContext, useEffect, useState} from 'react';
import {Link, Outlet, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import {Navbar, Nav} from 'react-bootstrap'; // Import Bootstrap components
import './MenuBar.css'
import SearchButton from "../Common/SearchButton/SearchButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faHistory} from "@fortawesome/free-solid-svg-icons";
import ShoppingModal from "../Common/ShoppingModal/ShoppingModal";
import axios from "axios";
import {RenderContext} from "../Common/CardContextProvider/CardContextProvider";
import MessageBox from "../Common/MesageBox/MessageBox";
import {MessageContext} from "../Common/MessageContextProvider/MessageContextProvider";
import HistoryModal from "../Common/HistoryModal/HistoryModal";

/**
 * the menu bar present the navigation option, always on top
 * @param onSearch
 * @returns {JSX.Element}
 * @constructor
 */
const MenuBar = ({onSearch}) => {
    const [scrolled, setScrolled] = useState(false);
    const [isShoppingOpen, setIsShoppingOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [cardShoppingCount, setCardShoppingCount] = useState(0);
    const {render, setRender} = useContext(RenderContext);
    const {message, setMessage} = useContext(MessageContext);
    const navigate = useNavigate();


    useEffect(() =>{
        axios("/cards")
            .then(res => setCardShoppingCount(res.data.length))
            .catch(e => setMessage(e.message));
    },[render]);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            if (isScrolled !== scrolled) {
                setScrolled(!scrolled);
            }
        };

        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    return (
        <>
            <ShoppingModal closeModal={() => setIsShoppingOpen(false)} show={isShoppingOpen}/>
            <HistoryModal closeModal={() => setIsHistoryOpen(false)} show={isHistoryOpen}/>

            <Navbar className={`${scrolled ? "dark" : "custom-navbar"}`} variant="dark" expand="lg" fixed="top">
                <Navbar.Brand className="h-font ms-3" href="/">NOT NETFLIX</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />

                <Navbar.Collapse>
                    <Nav className="ml-auto">
                        <Link className="text-light nav-link" to="/home">Home</Link>
                        <Link className="text-light nav-link" to="/movies">Movies</Link>
                        <Link className="text-light nav-link" to="/tv">TV</Link>
                        <Link className="text-light nav-link" to="/discover">Discover</Link>
                        <Link className="text-light nav-link" to="/about">About</Link>
                    </Nav>
                </Navbar.Collapse>

                <Navbar.Collapse  className="justify-content-end me-5">
                    {/*div is the only way for allow space typing*/}
                    <div className="text-light">
                        <SearchButton placeHolder="type movie name.."/>
                    </div>
                    <div role="button" className="text-light me-3 ms-3" onClick={() => setIsHistoryOpen(true)}>
                        <FontAwesomeIcon className="icon" icon={faHistory} />
                    </div>
                    <div role="button" className="text-light ms-3" onClick={() => setIsShoppingOpen(true)}>
                        <FontAwesomeIcon className="icon" icon={faCartShopping} />
                        <span className='badge badge-warning' id='lblCartCount'> {cardShoppingCount} </span>
                    </div>
                </Navbar.Collapse>

            </Navbar>

            <MessageBox type="error"/>

            <Outlet/>
        </>
    );
};

export default MenuBar;
