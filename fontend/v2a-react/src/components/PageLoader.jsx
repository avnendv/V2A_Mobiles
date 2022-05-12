import React from 'react';
import loading from '../assets/img/logo.gif';
export default function PageLoader(props) {
    return (
        <div id="spinner">
            <img src={loading} alt=""/>
        </div>
    );
}
