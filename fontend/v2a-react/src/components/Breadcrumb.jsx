import React from 'react';
import { Link } from 'react-router-dom';
import linkName from '../constants/linkName';
export default function Breadcrumb(props) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={linkName.HOME}><i className="fa fa-home" aria-hidden="true"></i> Trang chủ</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{props.page}</li>
            </ol>
        </nav>
    );
}
