import React, { useState, useRef } from "react";
import { Table } from "react-bootstrap";
import Layout from "../Layout/Layout";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import formatPrice from "../../helper/helper";
import image from "./image.png";
import style from "./Cart.module.css";

const Cart = () => {
  const [product, setProduct] = useState({
    avatar: `${image}`,
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
    <Layout>
      <div className={style.cartContainer}>
        <Table className={style.cartTable} responsive borderless>
          <thead>
            <tr>
              <th>#</th>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <div className={style.productAvatar}>
                  <img src={product.avatar} alt="avatar" />
                </div>
              </td>
              <td>
                <div className={style.hiddenText}>{product.name}</div>
              </td>
              <td>
                <div className={style.hiddenText}>{`${formatPrice(
                  product.price
                )}`}</div>
              </td>
              <td className={style.adjustProductQuantity}>
                <div className={style.customIcon}>
                  <RemoveCircleIcon
                    onClick={(e) => {
                      handleDecreQuantity(e);
                    }}
                    className={style.iconChild}
                  />
                </div>
                <input
                  ref={quantityProduct}
                  type="text"
                  className={style.productQuantity}
                  value={product.quantity > 0 ? product.quantity : 0}
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      quantity: Number(e.target.value),
                    });
                  }}
                />
                <div className={style.customIcon}>
                  <AddCircleSharpIcon
                    onClick={(e) => {
                      handleIncreQuantity(e);
                    }}
                    className={style.iconChild}
                  />
                </div>
              </td>
              <td>
                <div className={style.hiddenText}>
                  {`${formatPrice(
                    Number(product.quantity) * Number(product.price)
                  )}`}
                </div>
              </td>
              <td>
                <div className={`${style.hiddenText} ${style.delete}`}>Xóa</div>
              </td>
            </tr>
          </tbody>
        </Table>
        <div className={style.payment}>
          <div className={style.total}>Tổng tiền: {`tong tien here`}</div>
          <div type="submit" className={style.pay}>Thanh toán</div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
