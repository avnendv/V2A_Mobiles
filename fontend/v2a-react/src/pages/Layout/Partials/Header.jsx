import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import authApi from '../../../api/Auth';
import ModalAuth from '../../../components/Auth/ModalAuth';
import NavBar from '../../../components/NavBar';
import ERROR_MESSAGE from '../../../constants/errors';
import storage from '../../../constants/storage';
import { options } from '../../../helper/helper';
import { getLocalStorage, removeItemLocalStorage } from '../../../helper/storage';


export default function Header(props) {
    const [modalShow, setModalShow] = useState(false);
    const togleModal = () => setModalShow(!modalShow);
    const auth = getLocalStorage(storage.AUTH);

    useEffect(() => {
        if (auth) {
            authApi.check({token: auth.token})
            .then(response => {
                if (response.result !== 1) {
                    removeItemLocalStorage(storage.AUTH);
                }
            })
            .catch(error => {
                toast.error(ERROR_MESSAGE, options);
            })
        }
    }, []);
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
                                {auth ?
                                    <div>Xin chào, {auth.user.user_name}</div>
                                :
                                    <button className='btn btn-primary btn-login' onClick={() => setModalShow(true)}>Đăng nhập</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modalShow && <ModalAuth show={modalShow} onHide={togleModal} togleModal={togleModal} />}
            <NavBar/>
        </>
    );
}
