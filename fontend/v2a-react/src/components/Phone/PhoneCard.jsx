import React from 'react';
import { Link } from 'react-router-dom';
import linkName from '../../constants/linkName';
import formatPrice from '../../helper/helper';
export default function PhoneCard(props) {
    return (
        <div className="single-product">
            <div className="product-f-image">
                <img src="https://img.hungmobile.vn/hungmobile-vn/2021/11/w200/thuml.jpg" alt="" />
                <div className="product-hover">
                    <Link to={'#'} className="add-to-cart-link"><i className="fa fa-shopping-cart"></i> Thêm vào giỏ</Link>
                    <Link to={linkName.PHONE.DETAIL_INDEX + `/${props.phone.slug}`} className="view-details-link"><i className="fa fa-link"></i> Xem chi tiết</Link>
                </div>
            </div>
            
            <h2><Link to={linkName.PHONE.DETAIL_INDEX + `/${props.phone.slug}`}>{props.phone.name}</Link></h2>
            
            <div className="product-carousel-price">
                <ins>{formatPrice(props.phone.price)}</ins>
            </div> 
        </div>
    );
}
