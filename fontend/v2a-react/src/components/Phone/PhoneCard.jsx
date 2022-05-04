import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import linkName from '../../constants/linkName';
import storage from '../../constants/storage';
import formatPrice, { options } from '../../helper/helper';
import setLocalStorage, { getLocalStorage } from '../../helper/storage';
export default function PhoneCard(props) {
    const addToCart = () => {
        if (!getLocalStorage(storage.CART)) {
            setLocalStorage(storage.CART, {
                cart : [],
            });
        }
        const cart = getLocalStorage(storage.CART).cart;
        if (!cart.find(p => p.id === props.phone.id)) {
            cart.push({
                id: props.phone.id,
                name: props.phone.name,
                image: props.phone.image,
                price: props.phone.price,
                quantity: 1,
            });
            setLocalStorage(storage.CART, {cart});
            toast.success("Thêm vào giỏ hàng thành công", options);
        } else {
            toast.info("Điện thoại đã có trong giỏ hàng", options);
        }
    }

    return (
        <div className="single-product">
            <div className="product-f-image">
                <img src="https://img.hungmobile.vn/hungmobile-vn/2021/11/w200/thuml.jpg" alt="" />
                <div className="product-hover">
                    <div className="add-to-cart-link" onClick={() => addToCart()}><i className="fa fa-shopping-cart"></i> Thêm vào giỏ</div>
                    <Link to={linkName.PHONE.DETAIL_INDEX + `/${props.phone.slug}`} className="view-details-link"><i className="fa fa-search"></i> Xem chi tiết</Link>
                </div>
            </div>
            
            <h2><Link to={linkName.PHONE.DETAIL_INDEX + `/${props.phone.slug}`}>{props.phone.name}</Link></h2>
            
            <div className="product-carousel-price">
                <ins>{formatPrice(props.phone.price)}</ins>
            </div> 
        </div>
    );
}
