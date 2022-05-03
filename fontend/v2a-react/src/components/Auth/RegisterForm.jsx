import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
export default function RegisterForm(props) {
    return (
        <>
            <h5 className='text-center'>Đăng ký</h5>
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="username-register">
                            <Form.Label>Tên đăng nhập</Form.Label>
                            <Form.Control type="text" placeholder="Nhập tên đăng nhập" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="password-register">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type="password" placeholder="Nhập mật khẩu" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Giới tính</Form.Label>
                            <div>
                                <Form.Check inline type="radio">
                                    <Form.Check.Input type="radio" name="gender" />
                                    <Form.Check.Label>Nam</Form.Check.Label>
                                </Form.Check>
                                <Form.Check inline type="radio">
                                    <Form.Check.Input type="radio" name="gender" />
                                    <Form.Check.Label>Nữ</Form.Check.Label>
                                </Form.Check>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="birthdate-register">
                            <Form.Label>Ngày sinh</Form.Label>
                            <Form.Control type="date" placeholder="Nhập ngày sinh" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="phone-register">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control type="text" placeholder="Nhập số điện thoại" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="email-register">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Nhập email" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="address-register">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control type="text" placeholder="Nhập địa chỉ" />
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
