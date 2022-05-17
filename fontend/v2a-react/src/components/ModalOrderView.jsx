import React from 'react';
import { Col, Container, Modal, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import linkName from '../constants/linkName';
import formatPrice from '../helper/helper';
export default function ModalOrderView(props) {
    const {order} = props;

    const handleStatus = (status) => {
        let rs = "";
        switch (parseInt(status)) {
            case 0:
                rs = "Chờ xử lý";
                break;
            case 1:
                rs = "Đang giao";
                break;
            case 2:
                rs = "Đã giao";
                break;
        
            default:
                rs = "Đã huỷ";
                break;
        }
        return rs;
    }
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
                        <h4 className="text-center">Thông tin đơn hàng</h4>
                        <Row>
                            <Col>Mã đơn hàng: {order[0].id}</Col>
                            <Col>Ngày đặt hàng: {order[0].created_at}</Col>
                        </Row>
                        <Row>
                            <Col>Người nhận hàng: {order[0].full_name}</Col>
                            <Col>Phương thức thanh toán: {parseInt(order[0].payment) === 0 ? "Thanh toán khi nhận hàng(COD)" : "Thanh toán online"}</Col>
                        </Row>
                        <Row>
                            <Col>Trạng thái: {handleStatus(order[0].status)}</Col>
                            <Col>Địa chỉ: {order[0].address}</Col>
                        </Row>
                        <h5 className="my-2">Danh sách điện thoại</h5>
                        <Table className="cartTable" responsive borderless>
                            <thead>
                                <tr>
                                    <th>Mã</th>
                                    <th>Tên điện thoại</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                    <th>Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order && (
                                    order.map((product, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{product.phone_id}</td>
                                                <td><Link to={linkName.PHONE.DETAIL_INDEX + `/${product.slug}`} className="text-dark">{product.phone_name}</Link></td>
                                                <td>{product.quantity}</td>
                                                <td>{formatPrice(product.price)}</td>
                                                <td>{formatPrice(Number(product.quantity) * Number(product.price))}</td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </Table>
                        <h6 className="fst-italic">Phí ship: {formatPrice(0)}</h6>
                        <h5>Tổng tiền: {formatPrice(order.reduce((total, item) => {
                            total += (item.quantity * item.price);
                            return total;
                        }, 0))}</h5>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}
