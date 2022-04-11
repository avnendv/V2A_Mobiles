import React from 'react';
import { Link } from 'react-router-dom';
export default function PhoneCard(props) {
    return (
        <div className="single-product">
            <div className="product-f-image">
                <img src="https://img.hungmobile.vn/hungmobile-vn/2021/11/w200/thuml.jpg" alt="" />
                <div className="product-hover">
                    <Link to={'#'} className="add-to-cart-link"><i className="fa fa-shopping-cart"></i> Add to cart</Link>
                    <Link to={props.link + '/chi-tiet'} className="view-details-link"><i className="fa fa-link"></i> See details</Link>
                </div>
            </div>
            
            <h2><Link to={props.link + '/chi-tiet'}>Samsung Galaxy s5- 2015</Link></h2>
            
            <div className="product-carousel-price">
                <ins>$700.00</ins> <del>$100.00</del>
            </div> 
        </div>
    );
}
