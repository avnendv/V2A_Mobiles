import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import authApi from '../../api/Auth';
import ERROR_MESSAGE from '../../constants/errors';
import { options } from '../../helper/helper';

const schema = yup.object({
    user_name: yup.string().trim()
    .max(25, "Tên đăng nhập không được quá 25 ký tự")    
    .required("Tên đăng nhập không được để trống"),
    password: yup.string().trim()
    .max(15, "Mật khẩu không được quá 15 ký tự")
    .required("Mật khẩu không được để trống"),
    full_name: yup.string().trim()
    .required("Họ tên không được để trống"),
    gender: yup.number().typeError("Giới tính không được để trống")
    .required("Giới tính không được để trống"),
    birthdate: yup.date().typeError("Ngày sinh không được để trống"),
    phone: yup.string().trim()
    .max(15, "Số điện thoại không được quá 15 ký tự")
    .required("Số điện thoại không được để trống")
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]+$/im, "Số điện thoại không đúng định dạng"),
    address: yup.string().trim()
    .required("Địa chỉ không được để trống")
}).required();

export default function RegisterForm(props) {
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });
    const onSubmit = data => {
        authApi.register(data)
        .then(response => {
            if (response.result === 1) {
                toast.success('Đăng ký thành công! Bây giờ bạn có thể đăng nhập vào tài khoản của bạn!', options);
                reset({
                    "user_name": "",
                    "password": "",
                    "full_name": "",
                    "birthdate": null,
                    "gender": null,
                    "phone": "",
                    "email": "",
                    "address": "",
                });
            } else {
                toast.error(ERROR_MESSAGE, options);
            }
        })
        .catch(error => {
            toast.error(ERROR_MESSAGE, options);
        })
    };
    return (
        <>
            <h5 className='text-center'>Đăng ký</h5>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="username-register">
                            <Form.Label>Tên đăng nhập</Form.Label>
                            <Form.Control type="text" placeholder="Nhập tên đăng nhập" {...register("user_name")} />
                            <p className="valid-error">{errors.user_name?.message}</p>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="password-register">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type="password" placeholder="Nhập mật khẩu" {...register("password")} />
                            <p className="valid-error">{errors.password?.message}</p>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="full-name-register">
                            <Form.Label>Họ tên</Form.Label>
                            <Form.Control type="text" placeholder="Nhập họ tên" {...register("full_name")} />
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
                                    <Form.Check.Input type="radio" {...register("gender")} value={1}/>
                                    <Form.Check.Label>Nam</Form.Check.Label>
                                </Form.Check>
                                <Form.Check inline type="radio">
                                    <Form.Check.Input type="radio" {...register("gender")} value={0} />
                                    <Form.Check.Label>Nữ</Form.Check.Label>
                                </Form.Check>
                                <p className="valid-error">{errors.gender?.message}</p>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="birthdate-register">
                            <Form.Label>Ngày sinh</Form.Label>
                            <Form.Control type="date" placeholder="Nhập ngày sinh" {...register("birthdate")} />
                            <p className="valid-error">{errors.birthdate?.message}</p>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="phone-register">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control type="text" placeholder="Nhập số điện thoại" {...register("phone")} />
                            <p className="valid-error">{errors.phone?.message}</p>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="email-register">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Nhập email" {...register("email")} />
                            <p className="valid-error">{errors.email?.message}</p>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="address-register">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control type="text" placeholder="Nhập địa chỉ" {...register("address")} />
                            <p className="valid-error">{errors.address?.message}</p>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">
                    Đăng ký
                </Button>
            </Form>
        </>
    );
}
