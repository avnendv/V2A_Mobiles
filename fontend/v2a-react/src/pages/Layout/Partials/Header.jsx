import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../../components/NavBar';
import linkName from '../../../constants/linkName';

export default function Header(props) {

    return (
        <>
            <div className="header-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div>Thời gian hoạt động: 7:00 - 22:00( các ngày trong tuần)</div>
                        </div>
                        
                        <div className="col-md-4 d-flex justify-content-around">
                            <div>
                                <i className="fa fa-solid fa-phone"> Hotline: 01234567890</i>
                            </div>
                            <div>
                                <Link to={linkName.LOGIN}>Đăng nhập</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NavBar/>
        </>
    );
}
