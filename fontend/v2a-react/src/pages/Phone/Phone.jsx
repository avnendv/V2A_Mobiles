import React from "react";
import Breadcrumb from "../../components/Breadcrumb";

// Screens
import ScreensLayout from '../Layout/Layout';

export default function Phone(){
    return(
        <ScreensLayout>
            <div className="container phone-detail">
                <Breadcrumb page='Tên điện thoại'/>
                <div className="single-product-area">
                    <div className="row">
                        <div className="col-sm-3 product-image">
                            <div>Ảnh</div>
                        </div>
                        <div className="col-sm-6 product-center">
                            <div>Thông tin</div>
                        </div>
                        <div className="col-sm-3 product-shop">
                            <div>Thông tin bảo hành</div>
                        </div>
                    </div>
                    <div className="product-layout product-layout-grid">
                        <div className="product-left">
                            <div className="product-text">Chi tiết</div>
                        </div>
                        <div className="product-right">
                            <div className="product-specs">Thông số</div>
                        </div>
                    </div>
                    <div className="product-relate">
                        <h3 className="text-center my-3">Sản phẩm liên quan</h3>

                    </div>
                </div>
            </div> 
        </ScreensLayout>
    );
}
