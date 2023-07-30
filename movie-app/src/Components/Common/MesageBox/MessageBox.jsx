import React, {useContext, useEffect} from 'react';
import './MessageBox.css'
import {MessageContext} from "../MessageContextProvider/MessageContextProvider";


/**
 * simple error message component
 * @param text the text error (not shown if it's empty)
 * @param type can be "info" or "error"
 * @returns {JSX.Element}
 * @constructor
 */
function MessageBox({type}) {
    const messageType = type === "error" ? "alert-danger" : "alert-info";
    const classes = `${messageType} alert`;
    const {message, setMessage} = useContext(MessageContext);

    useEffect(() =>{
        if(message !== '')
            setInterval(() => setMessage(''), 6000);
    },[message]);

    return (
      <>
          {message !== "" ? (
              <div style={{
                  position: 'fixed',
                  top: '0',
                  left: '50%',
                  transform: 'translate(-50%, 0)',
                  zIndex: '9999',
                  textAlign: 'center'
              }}>
                  <div>
                      <p className={classes}>{message}</p>
                  </div>

              </div>
          ) : null}
      </>
    );
}
export default MessageBox;