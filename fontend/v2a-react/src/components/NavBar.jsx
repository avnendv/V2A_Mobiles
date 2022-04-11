import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container, InputGroup, Button, FormControl } from 'react-bootstrap';
import linkName from '../constants/linkName';

export default function NavBar(props) {
    return (
        <>
            <div className="site-branding-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-sm-2">
                            <div className="logo">
                                <h1><Link to={linkName.HOME}>
                                    <img src="/logo.png" alt='branch' style={{width: '120px'}}/>
                                </Link></h1>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <InputGroup>
                                <FormControl />
                                <Button className='btn-search'>
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </Button>
                            </InputGroup>
                        </div>
                        <div className="col-sm-2">
                            <div className="shopping-item">
                                <Link to={linkName.CART}>
                                    <i className="fa fa-shopping-cart"></i> <span className="product-count">5</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Navbar collapseOnSelect expand="lg">
                    <Container>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                <Link to={linkName.PHONE} className='nav-link'>Điện thoại
                                    <div className="sub-menu">
                                        <ul>
                                                <li><a href="https://hungmobile.vn/dien-thoai/apple-iphone" title="">iPhone</a></li>
                                                <li><a href="https://hungmobile.vn/dien-thoai/xiaomi" title="">Xiaomi</a></li>
                                                <li><a href="https://hungmobile.vn/dien-thoai/samsung" title="">Samsung</a></li>
                                                <li><a href="https://hungmobile.vn/dien-thoai/realme" title="">Realme</a></li>
                                                <li><a href="https://hungmobile.vn/dien-thoai/oneplus" title="">OnePlus</a></li>
                                                <li><a href="https://hungmobile.vn/dien-thoai/asus" title="">Rog Phone</a></li>
                                                <li><a href="https://hungmobile.vn/dien-thoai/vivo" title="">Vivo</a></li>
                                                <li><a href="https://hungmobile.vn/dien-thoai/nubia" title="">Nubia</a></li>
                                                <li><a href="https://hungmobile.vn/dien-thoai/oppo" title="">Oppo</a></li>
                                        </ul>
                                    </div>
                                </Link>
                                <Link to={''} className='nav-link'>Xaomi</Link>
                                <Link to={''} className='nav-link'>Iphone</Link>
                                <Link to={''} className='nav-link'>Oppo</Link>
                                <Link to={''} className='nav-link'>Bài viết</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    );
}
