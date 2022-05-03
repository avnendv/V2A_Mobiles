import React, { useRef } from 'react';
import { Carousel } from 'antd';
import PhoneCard from '../Phone/PhoneCard';

export default function PhoneLastest(props) {
    const {listPhone} = props;
    const slider = useRef(null);
    return (
        <>
            <div className="maincontent-area">
                <div className="zigzag-bottom"></div>
                {listPhone && 
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="latest-product">
                                    <h2 className="section-title">Điện thoại mới nhất</h2>
                                    <div className='d-flex justify-content-end'>
                                        <div className='btn btn-secondary me-2' onClick={() => slider.current.prev()}><i className="fa fa-angle-double-left" aria-hidden="true"></i></div>
                                        <div className='btn btn-secondary' onClick={() => slider.current.next()}><i className="fa fa-angle-double-right" aria-hidden="true"></i></div>
                                    </div>
                                    <Carousel infinite={false} initialSlide={1} autoplay={true} slidesToScroll={1} slidesToShow={5} className="product-carousel" ref={slider}>
                                        {
                                            listPhone.map((item) => {
                                                return <PhoneCard phone={item} key={item.id} />
                                            })
                                        }
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}
