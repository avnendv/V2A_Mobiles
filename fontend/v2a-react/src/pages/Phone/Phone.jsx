import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Rating from '@mui/material/Rating';
import { toast } from "react-toastify";
import phoneApi from "../../api/Phone";
import Breadcrumb from "../../components/Breadcrumb";
import ERROR_MESSAGE from "../../constants/errors";
import formatPrice, { options } from "../../helper/helper";
import setLocalStorage, { getLocalStorage } from "../../helper/storage";
import storage from "../../constants/storage";
import linkName from "../../constants/linkName";
import { Carousel } from "antd";
import PhoneCard from "../../components/Phone/PhoneCard";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

// Screens
import ScreensLayout from '../Layout/Layout';
import PageLoader from "../../components/PageLoader";

const schema = yup.object({
    comment: yup.string().trim()
    .required("Bình luận không được để trống"),
}).required();

export default function Phone(){
    const auth = getLocalStorage(storage.AUTH);
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [phoneRelate, setPhoneRelate] = useState(null);
    const [valueRatting, setValueRatting] = useState(4);
    const [rattingData, setRattingData] = useState(null);
    const slider = useRef(null);

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const getApiRatting = () => {
        phoneApi.getRatting({phone_id: data.id})
        .then((response) => {
            if (response.result === 1) {
                setRattingData(response.data.listRate);
            }
        })
        .catch(error => {
            toast.error(ERROR_MESSAGE, options);
        })
    }
    const getApiList = () => {
        phoneApi.getList({branch_id: data.branch_id})
        .then((response) => {
            if (response.result === 1) {
                setPhoneRelate(response.data.listPhone);
            }
        })
        .catch(error => {
            toast.error(ERROR_MESSAGE, options);
        })
    }
    const onSubmit = dataInput => {
        const dataSubmit = {
            ...dataInput,
            phone_id: data.id,
            ratting: valueRatting,
        }
        if (auth) {
            dataSubmit.user_id = auth.user_id;
        }
        phoneApi.createRatting(dataSubmit)
        .then((response) => {
            if (response.result === 1) {
                getApiRatting();
            }
        })
        .catch(error => {
            toast.error(ERROR_MESSAGE, options);
        })
    }

    const addToCart = () => {
        if (!getLocalStorage(storage.CART)) {
            setLocalStorage(storage.CART, {
                cart : [],
            });
        }
        const cart = getLocalStorage(storage.CART).cart;
        if (!cart.find(p => p.id === data.id)) {
            cart.push({
                id: data.id,
                name: data.name,
                image: data.image,
                price: data.price,
                quantity: 1,
            });
            setLocalStorage(storage.CART, {cart});
            toast.success("Thêm vào giỏ hàng thành công", options);
        } else {
            toast.info("Điện thoại đã có trong giỏ hàng", options);
        }
    }

    const buyNow = () => {
        addToCart();
        navigate(linkName.ORDER);
    }
    useEffect(() => {
        phoneApi.getDetail(params.slug)
        .then((response) => {
            if (response.result === 1) {
                setData(response.data);
            }
            setLoading(false);
        })
        .catch(error => {
            toast.error(ERROR_MESSAGE, options);
        })
    }, [params.slug]);

    useEffect(() => {
        if (data) {
            Promise.all([getApiList(), getApiRatting()])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, data);

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [loading]);

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
                                <p className="price current-product-price">
                                    <strong>
                                        {formatPrice(data.price)}
                                    </strong>
                                    <i> | Giá đã bao gồm 10% VAT</i>
                                </p>
                                <p className="freeship">
                                    <span className="icon-freeship-truck"></span> <span>Miễn phí vận chuyển toàn quốc</span>
                                </p>
                                <div className="w-100 product-center-info">
                                    <div className="w-100 fw-500 p-1">THÔNG TIN SẢN PHẨM</div>
                                    <div className="p-1 icon-info">
                                        <div><span role="img" aria-label="mobile" className="anticon anticon-mobile"><svg viewBox="64 64 896 896" focusable="false" data-icon="mobile" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M744 62H280c-35.3 0-64 28.7-64 64v768c0 35.3 28.7 64 64 64h464c35.3 0 64-28.7 64-64V126c0-35.3-28.7-64-64-64zm-8 824H288V134h448v752zM472 784a40 40 0 1080 0 40 40 0 10-80 0z"></path></svg></span>Nguyên hộp, đầy đủ phụ kiện từ nhà sản xuất</div>
                                        <div><span role="img" aria-label="file-protect" className="anticon anticon-file-protect"><svg viewBox="64 64 896 896" focusable="false" data-icon="file-protect" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M644.7 669.2a7.92 7.92 0 00-6.5-3.3H594c-6.5 0-10.3 7.4-6.5 12.7l73.8 102.1c3.2 4.4 9.7 4.4 12.9 0l114.2-158c3.8-5.3 0-12.7-6.5-12.7h-44.3c-2.6 0-5 1.2-6.5 3.3l-63.5 87.8-22.9-31.9zM688 306v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm184 458H208V148h560v296c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h312c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm402.6-320.8l-192-66.7c-.9-.3-1.7-.4-2.6-.4s-1.8.1-2.6.4l-192 66.7a7.96 7.96 0 00-5.4 7.5v251.1c0 2.5 1.1 4.8 3.1 6.3l192 150.2c1.4 1.1 3.2 1.7 4.9 1.7s3.5-.6 4.9-1.7l192-150.2c1.9-1.5 3.1-3.8 3.1-6.3V538.7c0-3.4-2.2-6.4-5.4-7.5zM826 763.7L688 871.6 550 763.7V577l138-48 138 48v186.7z"></path></svg></span>Bảo hành 24 tháng tại trung tâm bảo hành Chính hãng. 1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ nhà sản xuất.</div>
                                    </div>
                                </div>
                                <div className="product-action">
                                    <div className="btn-red btnQuickOrder btnbuy" onClick={() => buyNow()}><strong>MUA NGAY</strong><span> Giao tận nhà (COD) hoặc Nhận tại cửa hàng</span></div>
                                    <div className="add-cart btn-orange btnbuy btn-icon" onClick={() => addToCart()}><i className="fa fa-shopping-cart" aria-hidden="true"></i></div>
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
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <div className="product-rate">
                                    <div>Đánh giá</div>
                                    <Rating name="simple-controlled" value={valueRatting} onChange={(event, newValue) => {
                                        setValueRatting(newValue);
                                    }} />
                                    <Form.Group className="mb-3" controlId="">
                                        <Form.Label>Bình luận của bạn</Form.Label>
                                        <Form.Control as="textarea" rows={3} {...register("comment")} />
                                        <p className="valid-error">{errors.comment?.message}</p>
                                    </Form.Group>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="fst-italic">Đánh giá và bình luận về điện thoại</div>
                                    <button className="btn btn-success" type="submit"><i class="fa fa-paper-plane-o" aria-hidden="true"></i> Gửi bình luận</button>
                                </div>
                            </Form>
                            <div className="my-3">
                                {rattingData && rattingData.map((item) => {
                                    return <div key={item.id} className="mb-3">
                                        <h5 className="mb-0">{item.full_name || "Ẩn danh"}</h5>
                                        <span className="fst-italic text-secondary">{item.updated_at}</span>
                                        <br/>
                                        <Rating value={item.ratting} readOnly/>
                                        <div>{item.comment}</div>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className="product-relate">
                            <h3 className="text-center my-3">Sản phẩm liên quan</h3>
                            <div className='d-flex justify-content-end'>
                                <div className='btn btn-secondary me-2' onClick={() => slider.current.prev()}><i className="fa fa-angle-double-left" aria-hidden="true"></i></div>
                                <div className='btn btn-secondary' onClick={() => slider.current.next()}><i className="fa fa-angle-double-right" aria-hidden="true"></i></div>
                            </div>
                            {phoneRelate &&
                                <>
                                    <Carousel infinite={false} initialSlide={1} autoplay={true} slidesToScroll={1} slidesToShow={5} className="product-carousel" ref={slider}>
                                        {
                                            phoneRelate.map((item) => {
                                                return <PhoneCard phone={item} key={item.id} />
                                            })
                                        }
                                    </Carousel>
                                </>
                            }
                        </div>
                    </div>
                </div> 
            }
            {!data && <div className="fst-italic text-center text-danger my-3">Không tìm thấy sản phẩm nào!</div>}
            {loading && <PageLoader/>}
        </ScreensLayout>
    );
}
