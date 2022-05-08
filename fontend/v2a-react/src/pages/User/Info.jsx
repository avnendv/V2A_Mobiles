import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import homeApi from "../../api/Home";
import phoneApi from "../../api/Phone";
import Breadcrumb from "../../components/Breadcrumb";
import PhoneCard from "../../components/Phone/PhoneCard";
import PhoneFilter from "../../components/Phone/PhoneFilter";
import ERROR_MESSAGE from "../../constants/errors";
import { options } from "../../helper/helper";

// Screens
import ScreensLayout from '../Layout/Layout';
import { getLocalStorage } from "../../helper/storage";
import storage from "../../constants/storage";
import linkName from "../../constants/linkName";
import authApi from "../../api/Auth";

const schema = yup.object({
    user_name: yup.string().trim()
    .max(25, "Tên đăng nhập không được quá 25 ký tự")    
    .required("Tên đăng nhập không được để trống"),
    full_name: yup.string().trim()
    .required("Họ tên không được để trống"),
    gender: yup.number().typeError("Giới tính không được để trống")
    .required("Giới tính không được để trống"),
    birthdate: yup.date().typeError("Ngày sinh không được để trống"),
    email: yup.string().trim()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
    phone: yup.string().trim()
    .max(15, "Số điện thoại không được quá 15 ký tự")
    .required("Số điện thoại không được để trống")
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]+$/im, "Số điện thoại không đúng định dạng"),
    address: yup.string().trim()
    .required("Địa chỉ không được để trống")
}).required();

export default function UserInfo() {
    const auth = getLocalStorage(storage.AUTH);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => {
        authApi.update({...data, token: auth.token})
        .then(response => {
            if (response.result === 1) {
                toast.success('Cập nhật thông tin thành công!', options);
            }
        })
        .catch(error => {
            toast.error(ERROR_MESSAGE, options);
        })
    };
    useEffect(() => {
        if (!auth) {
            navigate(linkName.HOME.INDEX);
            return;
        }
        authApi.detail({token: auth.token})
        .then(response => {
            if (response.result === 1) {
                setUserInfo(response.data[0]);
            }
        })
        .catch(error => {
            toast.error(ERROR_MESSAGE, options);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <ScreensLayout>
            <div className="container user-info">
                <Breadcrumb page={'Cập nhật thông tin tài khoản'} />
                {userInfo && <div className="user-info-content">
                    <div className="info-logo"></div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="username-register">
                                    <Form.Label>Tên đăng nhập</Form.Label>
                                    <Form.Control type="text" placeholder="Nhập tên đăng nhập" {...register("user_name")} defaultValue={userInfo.user_name} />
                                    <p className="valid-error">{errors.user_name?.message}</p>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="full-name-register">
                                    <Form.Label>Họ tên</Form.Label>
                                    <Form.Control type="text" placeholder="Nhập họ tên" {...register("full_name")} defaultValue={userInfo.full_name} />
                                    <p className="valid-error">{errors.full_name?.message}</p>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Giới tính</Form.Label>
                                    <div>
                                        <Form.Check inline type="radio">
                                            <Form.Check.Input type="radio" {...register("gender")} value={1} defaultChecked={userInfo.gender == 1 ? true : false} />
                                            <Form.Check.Label>Nam</Form.Check.Label>
                                        </Form.Check>
                                        <Form.Check inline type="radio">
                                            <Form.Check.Input type="radio" {...register("gender")} value={0} defaultChecked={userInfo.gender == 0 ? true : false} />
                                            <Form.Check.Label>Nữ</Form.Check.Label>
                                        </Form.Check>
                                        <p className="valid-error">{errors.gender?.message}</p>
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="birthdate-register">
                                    <Form.Label>Ngày sinh</Form.Label>
                                    <Form.Control type="date" placeholder="Nhập ngày sinh" {...register("birthdate")} defaultValue={userInfo.birthdate} />
                                    <p className="valid-error">{errors.birthdate?.message}</p>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="phone-register">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control type="text" placeholder="Nhập số điện thoại" {...register("phone")} defaultValue={userInfo.phone} />
                                    <p className="valid-error">{errors.phone?.message}</p>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="email-register">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Nhập email" {...register("email")} defaultValue={userInfo.email} />
                                    <p className="valid-error">{errors.email?.message}</p>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="address-register">
                                    <Form.Label>Địa chỉ</Form.Label>
                                    <Form.Control type="text" placeholder="Nhập địa chỉ" {...register("address")} defaultValue={userInfo.address} />
                                    <p className="valid-error">{errors.address?.message}</p>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit">
                            Cập nhật
                        </Button>
                    </Form>
                </div>}
            </div>
        </ScreensLayout>
    );
}
