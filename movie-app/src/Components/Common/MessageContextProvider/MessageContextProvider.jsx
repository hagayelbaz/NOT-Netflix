import React, { createContext, ReactElement, useState ,useEffect } from 'react'


export const MessageContext = createContext({ message: '', setMessage: () => {} });

/**
 * the reason for this class it's to render every time
 * u added a card to your list
 * @param children use like this:
 * <code>
 *          <MessageContextProvider>
 *               <YourComponent />
 *          </MessageContextProvider>
 * </code>
 * @returns {JSX.Element}
 * @constructor
 */
export function MessageContextProvider({ children }) {
    const [message, setMessage] = useState('');

    return (
        <MessageContext.Provider value={{message, setMessage}}>
            {children}
        </MessageContext.Provider>
    )

}