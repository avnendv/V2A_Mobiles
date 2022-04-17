import React from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
export default function ModalAuth(props) {
    return (
        <>
            <Modal
                {...props}
                size="xl"
                centered
                backdrop="static"
                keyboard={false}
                className="modal-auth"
            >
                <Modal.Header closeButton className='border border-0' />
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col>
                                <LoginForm />
                            </Col>
                            <Col>
                                <RegisterForm />
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}
