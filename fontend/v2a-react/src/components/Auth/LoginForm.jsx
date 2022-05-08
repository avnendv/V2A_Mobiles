import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import authApi from '../../api/Auth';
import setLocalStorage from '../../helper/storage';
import storage from '../../constants/storage';
import { options } from '../../helper/helper';
import ERROR_MESSAGE from '../../constants/errors';

const schema = yup.object({
    user_name: yup.string().trim()
    .max(25, "Tên đăng nhập không được quá 25 ký tự")    
    .required("Tên đăng nhập không được để trống"),
    password: yup.string().trim()
    .max(15, "Mật khẩu không được quá 15 ký tự")
    .required("Mật khẩu không được để trống"),
}).required();

export default function LoginForm(props) {
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });
    const onSubmit = data => {
        authApi.login(data)
        .then(response => {
            if (response.result === 1) {
                setLocalStorage(storage.AUTH, {
                    user_id: response.data.user.user_id,
                    user_name: response.data.user.user_name,
                    full_name: response.data.user.full_name,
                    token: response.data.token,
                });
                props.togleModal();
            }
        })
        .catch(error => {
            toast.error(ERROR_MESSAGE, options);
        })
    };
    return (
        <>
            <h5 className='text-center'>Đăng nhập</h5>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="username-login">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control type="text" placeholder="Nhập tên đăng nhập" {...register("user_name")} />
                    <p className="valid-error">{errors.user_name?.message}</p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password-login">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="Mật khẩu" {...register("password")} />
                    <p className="valid-error">{errors.password?.message}</p>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Đăng nhập
                </Button>
            </Form>
        </>
    );
}
