import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from '../../../api/Auth';
import ModalAuth from '../../../components/Auth/ModalAuth';
import NavBar from '../../../components/NavBar';
import ERROR_MESSAGE from '../../../constants/errors';
import linkName from '../../../constants/linkName';
import storage from '../../../constants/storage';
import { options } from '../../../helper/helper';
import { getLocalStorage, removeItemLocalStorage } from '../../../helper/storage';


export default function Header(props) {
    const [modalShow, setModalShow] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const togleModal = () => setModalShow(!modalShow);
    const auth = getLocalStorage(storage.AUTH);
    const navigate = useNavigate();

    const handelLogOut = () => {
        removeItemLocalStorage(storage.AUTH);
        setIsLogout(true);
    }

    const navigateUserInfo = () => {
        navigate(linkName.USER_INFO);
    }
    const navigateUserOrder = () => {
        navigate(linkName.SELF_ORDER);
    }

    useEffect(() => {
        if (auth) {
            authApi.check({ token: auth.token })
                .then(response => {
                    if (response.result !== 1) {
                        removeItemLocalStorage(storage.AUTH);
                    }
                })
                .catch(error => {
                    toast.error(ERROR_MESSAGE, options);
                })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogout]);
    return (
        <>
            <div className="header-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <div>Thời gian hoạt động: 7:00 - 22:00( các ngày trong tuần)</div>
                        </div>

                        <div className="col-md-4 d-flex justify-content-around align-items-center">
                            <div>
                                <i className="fa fa-solid fa-phone"> Hotline: 01234567890</i>
                            </div>
                            <div>
                                {auth ?
                                    <div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-user">
                                                Xin chào, {auth?.full_name}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={navigateUserInfo}>Cập nhật thông tin</Dropdown.Item>
                                                <Dropdown.Item onClick={navigateUserOrder}>Đơn hàng của bạn</Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item onClick={handelLogOut}>Đăng xuất</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    :
                                    <button className='btn btn-primary btn-login' onClick={() => setModalShow(true)}>Đăng nhập</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modalShow && <ModalAuth show={modalShow} onHide={togleModal} togleModal={togleModal} />}
            <NavBar />
        </>
    );
}
