import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, Form } from "react-bootstrap";
import ScreensLayout from "../Layout/Layout";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import formatPrice, { options } from "../../helper/helper";
import storage from "../../constants/storage";
import setLocalStorage, { getLocalStorage } from "../../helper/storage";
import orderApi from "../../api/Order";
import { toast } from "react-toastify";
import ERROR_MESSAGE from "../../constants/errors";
import ModalAuth from "../../components/Auth/ModalAuth";

const schema = yup.object({
    full_name: yup.string().trim()
    .required("Họ tên không được để trống"),
    phone: yup.string().trim()
    .max(15, "Số điện thoại không được quá 15 ký tự")
    .required("Số điện thoại không được để trống")
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]+$/im, "Số điện thoại không đúng định dạng"),
    address: yup.string().trim()
    .required("Địa chỉ không được để trống"),
    notes: yup.string().max(100, "Ghi chú không được quá 100 ký tự"),
}).required();

const Pay = () => {
    const auth = getLocalStorage(storage.AUTH);
    const [modalShow, setModalShow] = useState(false);
    const togleModal = () => setModalShow(!modalShow);
    const [products, setProducts] = useState(getLocalStorage(storage.CART)?.cart || []);
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => {
        if (!products || !products.length) {
            toast.error('Không có sản phẩm nào để đặt hàng!', options);
            return;
        }
        orderApi.createOrder({data: {...data, total: totalPrice(products)}, products, token: auth.token})
        .then(response => {
            if (response.result === 1) {
                if (response.data?.vnpUrl) {
                    window.location.href = response.data.vnpUrl;
                    return;
                }
                toast.success('Bạn đã đặt hàng thành công!', options);
            }
        })
        .catch(error => {
            toast.error(ERROR_MESSAGE, options);
        })
    };
    const handleDeleteProduct = (index) => {
        products.splice(index, 1);
        setProducts([...products]);
    };
    const totalPrice = (products) => {
        let sum = 0
        if (products) {
            products.forEach(product => {
                sum += product.quantity * product.price;
            });
        } else sum = 0;
        return sum;
    };
    useEffect(() => {
        if (!auth) {
            setModalShow(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalShow]);
    useEffect(() => {
        setLocalStorage(storage.CART, { cart: products });
    }, [products]);
    return (
        <ScreensLayout>
            <div className="container orders">
                <div className="row py-4">
                    <div className="col-md-6 card-order">
                        {products.length > 0 ?
                            products.map((product, index) => {
                                return <div className="card-order-item" key={index}>
                                    <div className="row">
                                        <div className="col-4">
                                            <img src={product.image} alt="" />
                                        </div>
                                        <div className="col-6">
                                            <div className="delete-card">
                                                <RemoveCircleIcon
                                                    onClick={() => handleDeleteProduct(index)}
                                                    className="iconChild"
                                                />
                                            </div>
                                            <div className="phone-info">
                                                <div className="phone-name">{product.name}</div>
                                                <div className="phone-price">{formatPrice(product.price)}</div>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center phone-quantity">
                                                <div className="text-secondary">Số lượng: </div>
                                                <div className="customIcon">
                                                    <RemoveCircleIcon
                                                        onClick={(e) => {
                                                            if (product.quantity > 0) {
                                                                product.quantity = product.quantity - 1;
                                                            } else {
                                                                product.quantity = 0;
                                                            }
                                                            setProducts([...products]);
                                                        }}
                                                        className="iconChild"
                                                    />
                                                </div>
                                                <input
                                                    type="text"
                                                    className="productQuantity"
                                                    value={product.quantity > 0 ? product.quantity : 0}
                                                    onChange={(e) => {
                                                        product.quantity = Number(e.target.value);
                                                        setProducts([...products]);
                                                    }}
                                                />
                                                <div className="customIcon">
                                                    <AddCircleSharpIcon
                                                        onClick={(e) => {
                                                            if (product.quantity > 0) {
                                                                product.quantity = product.quantity + 1;
                                                            } else {
                                                                product.quantity = 0;
                                                            }
                                                            setProducts([...products]);
                                                        }}
                                                        className="iconChild"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="offset-3 col-6">
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                            })
                            :
                            <div>Không có điện thoại nào để tiến hành đặt hàng</div>
                        }
                        <div className="h6">Tổng giá trị: <span className="fst-italic fw-normal">{formatPrice(totalPrice(products))}</span></div>
                        <div className="h6">Giảm giá: <span className="fst-italic fw-normal">{formatPrice(0)}</span></div>
                        <div className="h6">Tổng thanh toán: <span className="fst-italic fw-normal">{formatPrice(totalPrice(products))}</span></div>
                    </div>
                    <div className="col-md-6">
                        <div className="h4 text-center info-title">Thông tin đặt hàng</div>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>Họ tên (*)</Form.Label>
                                <Form.Control type="text" placeholder="Nhập họ tên" {...register("full_name")} />
                                <p className="valid-error">{errors.full_name?.message}</p>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>Điện thoại (*)</Form.Label>
                                <Form.Control type="text" placeholder="Nhập số điện thoại" {...register("phone")} />
                                <p className="valid-error">{errors.phone?.message}</p>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>Địa chỉ nhận hàng (*)</Form.Label>
                                <Form.Control type="text" placeholder="Nhập địa chỉ nhận hàng" {...register("address")} />
                                <p className="valid-error">{errors.address?.message}</p>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>Ghi chú</Form.Label>
                                <Form.Control as="textarea" rows={3} {...register("notes")} />
                                <p className="valid-error">{errors.notes?.message}</p>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>Phương thức thanh toán (*)</Form.Label>
                                <div className="mb-3">
                                    <Form.Check 
                                        type="radio"
                                        label="Thanh toán bằng VNPAY"
                                        {...register("payment")}
                                        value={1}
                                    />
                                    <Form.Check 
                                        type="radio"
                                        label="Thanh toán COD"
                                        {...register("payment")}
                                        value={0}
                                        defaultChecked
                                    />
                                </div>
                            </Form.Group>
                            
                            <div className="text-center">
                                <Button variant="primary" type="submit">
                                    Đặt hàng
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            {modalShow && <ModalAuth show={modalShow} onHide={togleModal} togleModal={togleModal} />}
        </ScreensLayout>
    );
};

export default Pay;
