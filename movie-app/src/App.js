import React from 'react';
import Main from "./Main/Main";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from "react-bootstrap";
import {CardContextProvider} from "./Components/Common/CardContextProvider/CardContextProvider";
import {MessageContextProvider} from "./Components/Common/MessageContextProvider/MessageContextProvider";
import {HistoryContextProvider} from "./Components/Common/HistoryContextProvider/HistoryContextProvider"; // Import Bootstrap CSS

//a91996f9139a47dc2e63eaf369cc1d0e

/*
token
eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTE5OTZmOTEzOWE0N2RjMmU2M2VhZjM2OWNjMWQwZSIsInN1YiI6IjY0NjYxNzZkZDE4NTcyMDE2MTkwM2U2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OJbUfOy137PVxq84fpMLX9vIIMEZkehzhoUScoftL3M

 */


const App = () => {
    return (
        <div className="container-fluid">
            <Row className="image-main-row">
                <div className="main-container p-0">
                   <CardContextProvider>
                       <MessageContextProvider>
                          <HistoryContextProvider>
                              <Main />
                          </HistoryContextProvider>
                       </MessageContextProvider>
                   </CardContextProvider>
                </div>
            </Row>
        </div>

    );
};

export default App;
