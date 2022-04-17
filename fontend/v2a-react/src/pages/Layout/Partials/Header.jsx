import React, { useState } from 'react';
import ModalAuth from '../../../components/Auth/ModalAuth';
import NavBar from '../../../components/NavBar';

export default function Header(props) {
    const [modalShow, setModalShow] = useState(false);
    const togleModal = () => setModalShow(!modalShow);
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
                                <button className='btn btn-primary btn-login' onClick={() => setModalShow(true)}>Đăng nhập</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modalShow && <ModalAuth show={modalShow} onHide={togleModal} />}
            <NavBar/>
        </>
    );
}
