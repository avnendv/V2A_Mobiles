import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import formatPrice from '../../helper/helper';
import linkName from '../../constants/linkName';

export default function PhoneWidgetArea(props) {
    const {topPhone} = props;
    return (
        <div className="product-widget-area">
            <div className="zigzag-bottom"></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="single-product-widget">
                            <h2 className="product-wid-title">Top bán chạy</h2>
                            <Link to="#" className="wid-view-more">Xem tất cả</Link>
                            {
                                topPhone?.phoneRate?.length && topPhone.phoneRate.map(item => {
                                    return <div className="single-wid-product" key={item.id}>
                                        <Link to={linkName.PHONE.DETAIL_INDEX + `/${item.slug}`}><img src={item.image} alt="" className="product-thumb"/></Link>
                                        <h2><Link to={linkName.PHONE.DETAIL_INDEX + `/${item.slug}`}>{item.name}</Link></h2>
                                        <div className="product-wid-rating">
                                            <Rating name="read-only" value={item.ratting ?? 4} readOnly />
                                        </div>
                                        <div className="product-wid-price">
                                            <ins>{formatPrice(item.price)}</ins>
                                        </div>                            
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="single-product-widget">
                            <h2 className="product-wid-title">Top đánh giá</h2>
                            <Link to="#" className="wid-view-more">Xem tất cả</Link>
                            {
                                topPhone?.phoneView?.length && topPhone.phoneView.map(item => {
                                    return <div className="single-wid-product" key={item.id}>
                                        <Link to={linkName.PHONE.DETAIL_INDEX + `/${item.slug}`}><img src={item.image} alt="" className="product-thumb"/></Link>
                                        <h2><Link to={linkName.PHONE.DETAIL_INDEX + `/${item.slug}`}>{item.name}</Link></h2>
                                        <div className="product-wid-rating">
                                            <Rating name="read-only" value={item.ratting ?? 4} readOnly />
                                        </div>
                                        <div className="product-wid-price">
                                            <ins>{formatPrice(item.price)}</ins>
                                        </div>                            
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="single-product-widget">
                            <h2 className="product-wid-title">Top mới nhất</h2>
                            <Link to="#" className="wid-view-more">Xem tất cả</Link>
                            {
                                topPhone?.phoneNew?.length && topPhone.phoneNew.map(item => {
                                    return <div className="single-wid-product" key={item.id}>
                                        <Link to={linkName.PHONE.DETAIL_INDEX + `/${item.slug}`}><img src={item.image} alt="" className="product-thumb"/></Link>
                                        <h2><Link to={linkName.PHONE.DETAIL_INDEX + `/${item.slug}`}>{item.name}</Link></h2>
                                        <div className="product-wid-rating">
                                            <Rating name="read-only" value={item.ratting ?? 4} readOnly />
                                        </div>
                                        <div className="product-wid-price">
                                            <ins>{formatPrice(item.price)}</ins>
                                        </div>                            
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
