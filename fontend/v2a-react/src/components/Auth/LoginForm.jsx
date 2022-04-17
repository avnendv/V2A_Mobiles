import React from 'react';
import { Button, Form } from 'react-bootstrap';
export default function LoginForm(props) {
    return (
        <>
            <h5 className='text-center'>Đăng nhập</h5>
            <Form>
                <Form.Group className="mb-3" controlId="username-login">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control type="text" placeholder="Nhập tên đăng nhập" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password-login">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="Mật khẩu" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Đăng nhập
                </Button>
            </Form>
        </>
    );
}
