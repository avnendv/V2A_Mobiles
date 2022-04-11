import React, { useRef } from 'react';
import { Carousel } from 'antd';
import PhoneCard from '../Phone/PhoneCard';
export default function PhoneLastest(props) {
    const slider = useRef(null);
    return (
        <>
            <div className="maincontent-area">
                <div className="zigzag-bottom"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="latest-product">
                                <h2 className="section-title">Điện thoại mới nhất</h2>
                                <div className='d-flex justify-content-end'>
                                    <div className='btn btn-secondary me-2' onClick={() => slider.current.prev()}><i className="fa fa-angle-double-left" aria-hidden="true"></i></div>
                                    <div className='btn btn-secondary' onClick={() => slider.current.next()}><i className="fa fa-angle-double-right" aria-hidden="true"></i></div>
                                </div>
                                <Carousel slidesToScroll={1} slidesToShow={5} className="product-carousel" ref={slider}>
                                    {
                                        [1,2,3,4,5,6,7,8,9].map((item, index) => {
                                            return <PhoneCard phone={item} key={index} />
                                        })
                                    }
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
