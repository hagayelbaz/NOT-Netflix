import React, { createContext, ReactElement, useState ,useEffect } from 'react'


export const HistoryContext = createContext({ history: [], setHistory: () => {} });

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
export function HistoryContextProvider({ children }) {
    const [history, setHistory] = useState([]);


    return (
        <HistoryContext.Provider value={{history, setHistory}}>
            {children}
        </HistoryContext.Provider>
    )

}