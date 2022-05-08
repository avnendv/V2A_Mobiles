import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import ScreensLayout from "../Layout/Layout";
import orderApi from "../../api/Order";
import { options } from "../../helper/helper";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import ERROR_MESSAGE from "../../constants/errors";

const schema = yup.object({
    order_id: yup.string().trim()
    .required("Mã đơn hàng không được để trống"),
    phone: yup.string().trim()
    .max(15, "Số điện thoại không được quá 15 ký tự")
    .required("Số điện thoại không được để trống")
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]+$/im, "Số điện thoại không đúng định dạng"),
}).required();

const OrderCheck = () => {
    const [orderCheck, setOrderCheck] = useState(null);
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        orderApi.checkOrder(data)
        .then(response => {
            if (response.result === 1) {
                setOrderCheck(response.data?.listOrder[0]);
                return;
            }
            toast.error(ERROR_MESSAGE, options);
        })
        .catch(error => {
            toast.error(ERROR_MESSAGE, options);
        })
    }

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
            <ScreensLayout>
                <div className="container order-check">
                    <div className="row">
                        <h3 className="text-center">Kiểm tra đơn hàng của bạn</h3>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="">
                                        <Form.Label>Mã đơn hàng (*)</Form.Label>
                                        <Form.Control type="text" placeholder="Nhập mã đơn hàng" {...register("order_id")} />
                                        <p className="valid-error">{errors.order_id?.message}</p>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3" controlId="">
                                        <Form.Label>Điện thoại (*)</Form.Label>
                                        <Form.Control type="text" placeholder="Nhập số điện thoại" {...register("phone")} />
                                        <p className="valid-error">{errors.phone?.message}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            
                            <div className="text-center">
                                <Button variant="primary" type="submit">
                                    Kiểm tra
                                </Button>
                            </div>
                        </Form>
                    </div>
                    <div className="my-3">
                        {orderCheck ?
                            <div className="order-check-content px-4">
                                <Row className="py-2">
                                    <Col>Mã đơn hàng: {orderCheck.id}</Col>
                                    <Col>Trạng thái: {handleStatus(orderCheck.status)}</Col>
                                </Row>
                                <Row className="py-2">
                                    <Col>Tên người nhận: {orderCheck.full_name}</Col>
                                    <Col>Địa chỉ nhận: {orderCheck.address}</Col>
                                </Row>
                                <Row className="py-2">
                                    <Col>Ngày đặt hàng: {orderCheck.created_at}</Col>
                                    <Col>Phương thức thanh toán: {parseInt(orderCheck.payment) === 0 ? "Thanh toán khi nhận hàng(COD)" : "Thanh toán online"}</Col>
                                </Row>
                            </div>
                        :
                            <div className="text-center fst-italic text-danger">Không tìm thấy đơn hàng!</div>
                        }
                    </div>
                </div>
            </ScreensLayout>
        </>
    );
};

export default OrderCheck;