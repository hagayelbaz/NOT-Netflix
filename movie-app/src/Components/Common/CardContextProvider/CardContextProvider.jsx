import React, { createContext, ReactElement, useState ,useEffect } from 'react'


export const RenderContext = createContext({ render: 0, setRender: () => {} });

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
export function CardContextProvider({ children }) {
    const [render, setRender] = useState(0);


    return (
        <RenderContext.Provider value={{render, setRender}}>
            {children}
        </RenderContext.Provider>
    )

}