import React from 'react';
export default function PhoneCard(props) {
    return (
        <div className="single-product">
            <div className="product-f-image">
                <img src="https://img.hungmobile.vn/hungmobile-vn/2021/11/w200/thuml.jpg" alt="" />
                <div className="product-hover">
                    <a href="." className="add-to-cart-link"><i className="fa fa-shopping-cart"></i> Add to cart</a>
                    <a href="single-product.html" className="view-details-link"><i className="fa fa-link"></i> See details</a>
                </div>
            </div>
            
            <h2><a href=".">Samsung Galaxy s5- 2015</a></h2>
            
            <div className="product-carousel-price">
                <ins>$700.00</ins> <del>$100.00</del>
            </div> 
        </div>
    );
}
