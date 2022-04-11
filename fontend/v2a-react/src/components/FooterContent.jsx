import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterContent(props) {
    return (
        <div className="footer-top-area">
			<div className="zigzag-bottom"></div>
			<div className="container">
				<div className="row">
					<div className="col-md-3 col-sm-6">
						<div className="footer-about-us">
							<h2><span>V2A </span>Moblie</h2>
							<p>Giới thiệu thông tin</p>
							<div className="footer-social">
								<a href="." target="_blank"><i className="fa fa-facebook"></i></a>
								<a href="." target="_blank"><i className="fa fa-twitter"></i></a>
								<a href="." target="_blank"><i className="fa fa-youtube"></i></a>
								<a href="." target="_blank"><i className="fa fa-linkedin"></i></a>
							</div>
						</div>
					</div>
					
					<div className="col-md-3 col-sm-6">
						<div className="footer-menu">
							<h2 className="footer-wid-title">Hỗ trợ - Dịch vụ </h2>
							<ul>
								<li><Link to={'#'}>Mua hàng trả góp</Link></li>
								<li><Link to={'#'}>Hướng dẫn đặt hàng và thanh toán</Link></li>
								<li><Link to={'#'}>Chính sách bảo hành</Link></li>
								<li><Link to={'#'}>Câu hỏi thường gặp</Link></li>
								<li><Link to={'#'}>Chính sách bảo mật</Link></li>
							</ul>                        
						</div>
					</div>
					
					<div className="col-md-3 col-sm-6">
						<div className="footer-menu">
							<h2 className="footer-wid-title">Thông tin liên hệ</h2>
							<ul>
								<li><Link to={'#'}>Bán hàng Online</Link></li>
								<li><Link to={'#'}>Chăm sóc khách hàng</Link></li>
								<li><Link to={'#'}>Hỗ trợ kỹ thuật</Link></li>
								<li><Link to={'#'}>Hỗ trợ bảo hành và sửa chửa</Link></li>
								<li><Link to={'#'}>Liên hệ khối văn phòng</Link></li>
							</ul>                        
						</div>
					</div>
					
					<div className="col-md-3 col-sm-6">
						<div className="footer-newsletter">
							<h2 className="footer-wid-title">Đăng ký nhận thông tin</h2>
							<p>Nhập email để nhận được thông báo các sản phẩm mới nhất và ưu đãi nhất từ shop!</p>
							<div className="newsletter-form">
								<form action="#">
									<input type="email" placeholder="Nhập email của bạn..." />
									<input type="submit" value="Subscribe" />
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    );
}
