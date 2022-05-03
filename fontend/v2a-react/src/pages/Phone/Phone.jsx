import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import phoneApi from "../../api/Phone";
import Breadcrumb from "../../components/Breadcrumb";
import ERROR_MESSAGE from "../../constants/errors";
import formatPrice, { options } from "../../helper/helper";
import setLocalStorage from "../../helper/storage";
import storage from "../../constants/storage";

// Screens
import ScreensLayout from '../Layout/Layout';

export default function Phone(){
    const params = useParams();

    const [data, setData] = useState(null);

    const addToCart = () => {
        setLocalStorage(storage.CART, {});;
    }

    useEffect(() => {
        phoneApi.getDetail(params.slug)
        .then((response) => {
            if (response.result === 1) {
                setData(response.data);
            }
        })
        .catch(error => {
            toast.error(ERROR_MESSAGE, options);
        })
    }, [params.slug]);
    return(
        <ScreensLayout>
            {data &&
                <div className="container phone-detail">
                    <Breadcrumb page={data.name}/>
                    <div className="single-product-area my-3">
                        <div className="row">
                            <div className="col-sm-3 product-image">
                                <h5>{data.name}</h5>
                                <div className="mt-3">
                                    <img src={data.image} alt="" />
                                </div>
                            </div>
                            <div className="col-sm-6 product-center">
                                <p class="price current-product-price">
                                    <strong>
                                        {formatPrice(data.price)}
                                    </strong>
                                    <i> | Giá đã bao gồm 10% VAT</i>
                                </p>
                                <p class="freeship">
                                    <span class="icon-freeship-truck"></span> <span>Miễn phí vận chuyển toàn quốc</span>
                                </p>
                                <div class="w-100 product-center-info">
                                    <div class="w-100 fw-500 p-1">THÔNG TIN SẢN PHẨM</div>
                                    <div class="p-1 icon-info">
                                        <div><span role="img" aria-label="mobile" class="anticon anticon-mobile"><svg viewBox="64 64 896 896" focusable="false" data-icon="mobile" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M744 62H280c-35.3 0-64 28.7-64 64v768c0 35.3 28.7 64 64 64h464c35.3 0 64-28.7 64-64V126c0-35.3-28.7-64-64-64zm-8 824H288V134h448v752zM472 784a40 40 0 1080 0 40 40 0 10-80 0z"></path></svg></span>Nguyên hộp, đầy đủ phụ kiện từ nhà sản xuất</div>
                                        <div><span role="img" aria-label="file-protect" class="anticon anticon-file-protect"><svg viewBox="64 64 896 896" focusable="false" data-icon="file-protect" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M644.7 669.2a7.92 7.92 0 00-6.5-3.3H594c-6.5 0-10.3 7.4-6.5 12.7l73.8 102.1c3.2 4.4 9.7 4.4 12.9 0l114.2-158c3.8-5.3 0-12.7-6.5-12.7h-44.3c-2.6 0-5 1.2-6.5 3.3l-63.5 87.8-22.9-31.9zM688 306v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm184 458H208V148h560v296c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h312c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm402.6-320.8l-192-66.7c-.9-.3-1.7-.4-2.6-.4s-1.8.1-2.6.4l-192 66.7a7.96 7.96 0 00-5.4 7.5v251.1c0 2.5 1.1 4.8 3.1 6.3l192 150.2c1.4 1.1 3.2 1.7 4.9 1.7s3.5-.6 4.9-1.7l192-150.2c1.9-1.5 3.1-3.8 3.1-6.3V538.7c0-3.4-2.2-6.4-5.4-7.5zM826 763.7L688 871.6 550 763.7V577l138-48 138 48v186.7z"></path></svg></span>Bảo hành 24 tháng tại trung tâm bảo hành Chính hãng. 1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ nhà sản xuất.</div>
                                    </div>
                                </div>
                                <div class="product-action">
                                    <div className="btn-red btnQuickOrder btnbuy"><strong>MUA NGAY</strong><span> Giao tận nhà (COD) hoặc Nhận tại cửa hàng</span></div>
                                    <div className="add-cart btn-orange btnbuy btn-icon" onClick={() => addToCart()}><i class="fa fa-shopping-cart" aria-hidden="true"></i></div>
							    </div>
                            </div>
                            <div className="col-sm-3 product-shop">
                                <div className="warranty">    
                                    <div className="text-center h4">Thông tin bảo hành</div>
                                    <p><i className="fa fa-shield"></i><span><strong>Bảo hành chính hãng 12 tháng. Bao xài đổi trả trong 15 ngày đầu.</strong></span></p>
                                </div>
                            </div>
                        </div>
                        <div className="product-layout product-layout-grid">
                            <div className="product-left">
                                <div className="product-text">
                                    <div dangerouslySetInnerHTML={{
                                        __html: data.detail
                                        }}>
                                    </div>
                                </div>
                            </div>
                            <div className="product-right">
                                <div className="product-specs">Thông số kỹ thuật</div>
                                <div className="product-specs-content">
                                    <div className="row border-top border-bottom p-2">
                                        <div className="col-5">Màn hình</div>
                                        <div className="col-7">{data.spec_screen_size}</div>
                                    </div>
                                    <div className="row border-top border-bottom p-2">
                                        <div className="col-5">Camera sau</div>
                                        <div className="col-7">{data.spec_his_camera}</div>
                                    </div>
                                    <div className="row border-top border-bottom p-2">
                                        <div className="col-5">Camera trước</div>
                                        <div className="col-7">{data.spec_font_camera}</div>
                                    </div>
                                    <div className="row border-top border-bottom p-2">
                                        <div className="col-5">Chip xử lý(CPU)</div>
                                        <div className="col-7">{data.spec_chip}</div>
                                    </div>
                                    <div className="row border-top border-bottom p-2">
                                        <div className="col-5">Bộ Nhớ RAM</div>
                                        <div className="col-7">{data.spec_ram}</div>
                                    </div>
                                    <div className="row border-top border-bottom p-2">
                                        <div className="col-5">Bộ Nhớ Trong (ROM)</div>
                                        <div className="col-7">{data.spec_rom}</div>
                                    </div>
                                    <div className="row border-top border-bottom p-2">
                                        <div className="col-5">Hỗ trợ Sim</div>
                                        <div className="col-7">{data.spec_sim}</div>
                                    </div>
                                    <div className="row border-top border-bottom p-2">
                                        <div className="col-5">Công nghệ bảo mật</div>
                                        <div className="col-7">{data.spec_security}</div>
                                    </div>
                                    <div className="row border-top border-bottom p-2">
                                        <div className="col-5">Pin</div>
                                        <div className="col-7">{data.spec_pin}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-comment">
                            <h6>Bình luận về {data.name}</h6>
                        </div>
                        <div className="product-relate">
                            <h3 className="text-center my-3">Sản phẩm liên quan</h3>

                        </div>
                    </div>
                </div> 
            }
            {!data && <div className="fst-italic text-center text-danger my-3">Không tìm thấy sản phẩm nào!</div>}
        </ScreensLayout>
    );
}
