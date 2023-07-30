import React from "react";
import './Loading.css'


/**
 * simple loading - bootstrap component
 * @param dep the dependency if show the component
 * @returns {JSX.Element}
 * @constructor
 */
const Loading = ({dep}) => {
    return (
        dep ? (
            <div className="position-fixed top-50 start-50 bg-transparent">
                <div className="spinner-border text-info" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        ) : <div/>
    );

}

export default Loading;