import React, { useState, useRef } from "react";
import { Table } from "react-bootstrap";
import ScreensLayout from "../Layout/Layout";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import formatPrice from "../../helper/helper";

const Cart = () => {
    const [product, setProduct] = useState({
        avatar: ``,
        name: "ship your idea",
        price: "15000",
        quantity: 1,
    });
    const quantityProduct = useRef();
    const handleDecreQuantity = (e) => {
        quantityProduct.current.value = e.target.value - 1;
        setProduct({ ...product, quantity: product.quantity - 1 });
    };
    const handleIncreQuantity = (e) => {
        quantityProduct.current.value = e.target.value + 1;
        setProduct({ ...product, quantity: product.quantity + 1 });
    };
    return (
        <ScreensLayout>
            <div className="cartContainer">
                <Table className="cartTable" responsive borderless>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th>Tên điện thoại</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                <div className="productAvatar">
                                    <img src={product.avatar} alt="avatar" />
                                </div>
                            </td>
                            <td>
                                <div className="hiddenText">{product.name}</div>
                            </td>
                            <td>
                                <div className="hiddenText">{`${formatPrice(
                                    product.price
                                )}`}</div>
                            </td>
                            <td className="adjustProductQuantity">
                                <div className="customIcon">
                                    <RemoveCircleIcon
                                        onClick={(e) => {
                                            handleDecreQuantity(e);
                                        }}
                                        className="iconChild"
                                    />
                                </div>
                                <input
                                    ref={quantityProduct}
                                    type="text"
                                    className="productQuantity"
                                    value={product.quantity > 0 ? product.quantity : 0}
                                    onChange={(e) => {
                                        setProduct({
                                            ...product,
                                            quantity: Number(e.target.value),
                                        });
                                    }}
                                />
                                <div className="customIcon">
                                    <AddCircleSharpIcon
                                        onClick={(e) => {
                                            handleIncreQuantity(e);
                                        }}
                                        className="iconChild"
                                    />
                                </div>
                            </td>
                            <td>
                                <div className="hiddenText">
                                    {`${formatPrice(
                                        Number(product.quantity) * Number(product.price)
                                    )}`}
                                </div>
                            </td>
                            <td>
                                <div className="hiddenText delete">Xóa</div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <hr className="my-4" />
                <div className="payment">
                    <div className="total">Tổng tiền: {`tong tien here`}</div>
                    <div type="submit" className="pay">Thanh toán</div>
                </div>
            </div>
        </ScreensLayout>
    );
};

export default Cart;