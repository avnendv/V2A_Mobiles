import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ScreensLayout from "../Layout/Layout";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import formatPrice from "../../helper/helper";
import storage from "../../constants/storage";
import setLocalStorage, { getLocalStorage } from "../../helper/storage";

const Cart = () => {
    const [products, setProducts] = useState(getLocalStorage(storage.CART)?.cart || []);
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
        return formatPrice(sum)
    };
    useEffect(() => {
        setLocalStorage(storage.CART, {cart: products});
    }, [products]);

    return (
        <ScreensLayout>
            <div className="cartContainer">
                <Table className="cartTable" responsive borderless>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Tên điện thoại</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.length > 0 ? (
                            products.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="productAvatar">
                                                <img src={product.image} alt="avatar" />
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
                                        </td>
                                        <td>
                                            <div className="hiddenText">
                                                {`${formatPrice(
                                                    Number(product.quantity) * Number(product.price)
                                                )}`}
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                onClick={() => {
                                                    handleDeleteProduct(index);
                                                }}
                                                className="hiddenText delete"
                                            >
                                                Xóa
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <div className="fst-italic">Giỏ hàng của bạn trống!</div>
                        )}
                    </tbody>
                </Table>
                <hr className="my-4" />
                <div className="payment">
                    <div className="total">Tổng tiền: {totalPrice(products)}</div>
                    <div type="submit" onClick={() => { console.log('product selected: ', products); }} className="pay">
                        Thanh toán
                    </div>
                </div>
            </div>
        </ScreensLayout>
    );
};

export default Cart;
