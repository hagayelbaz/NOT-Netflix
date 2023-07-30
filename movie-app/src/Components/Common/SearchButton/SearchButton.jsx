import React, {useContext, useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";
import './SearchButton.css'
import {useLocation, useNavigate} from "react-router-dom";
import SmartNavigation from "../../../Classes/SmartNavigation";
import {HistoryContext} from "../HistoryContextProvider/HistoryContextProvider";


/**
 * search button, with animation
 * @param placeHolder place holder...
 * @param onInputChange function that gets the value
 * @returns {JSX.Element}
 * @constructor
 */
const SearchButton = ({placeHolder}) => {
    const [showTextBox, setShowTextBox] = useState(false);
    const {history, setHistory} = useContext(HistoryContext);
    const [search, setSearch] = useState('');
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();


    const handleSearch = (val) => {
        const params = {
            query : val,
        };

        if (!val || val.trim() === '')
            navigate('/');
         else
             SmartNavigation.handle(navigate, val, 'search', location, params);

         setSearch(val);
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        setShowTextBox(false);
        setHistory(p => p ? [...p, search] : [search]);
    };

    useEffect(() => {
        if (showTextBox && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showTextBox]);


    return (
        <>
            {!showTextBox && (
                <Button className="text-light border-0 bg-transparent" onClick={() => setShowTextBox(true)}>
                    <FontAwesomeIcon className="icon" icon={faSearch}/>
                </Button>
            )}

            {showTextBox && (
                <form onSubmit={handleSubmit}>
                    <input
                        ref={inputRef}
                        type="text"
                        onChange={({target}) => handleSearch(target.value)}
                        onBlur={() => setShowTextBox(false)}
                        className={`search-text p-1 ${showTextBox ? 'show-input' : ''}`}
                        placeholder={placeHolder}
                    />
                </form>
            )}
        </>
    );
};

export default SearchButton;

