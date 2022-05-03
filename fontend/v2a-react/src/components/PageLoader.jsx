import React from 'react';
import { Spinner } from 'react-bootstrap';
export default function PageLoader(props) {
    return (
        // <div className="page-loader">
        //     <div className="loading-overlay"></div>
        // </div>
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
}
