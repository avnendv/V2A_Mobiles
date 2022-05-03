import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container, InputGroup, Button, FormControl } from 'react-bootstrap';
import linkName from '../constants/linkName';
import homeApi from '../api/Home';
import SearchItem from './SearchItem';

export default function NavBar(props) {
    const [branches, setBranches] = useState([]);
    const [searchValue, setSearchValue] = useState(null);
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState(null);

    const getApiSearch = (value) => {
        const search = {
            phone_name: value,
            is_search: 1,
        };
        homeApi.getListPhone(search)
        .then(response => {
            if (response.result === 1) {
                setData(response.data.listPhone);
            }
        })
    }
    useEffect(() => {
        homeApi.getBranch()
        .then(response => {
            if (response.result === 1) {
                setBranches(response.data);
            }
        })
    }, []);
    useEffect(() => {
        if (searchValue) {
            getApiSearch(searchValue);
            setIsShow(true);
        }
    }, [searchValue])
    return (
        <>
            <div className="site-branding-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-sm-2">
                            <div className="logo">
                                <h1><Link to={'/'}>
                                    <img src="/logo.png" alt='branch' style={{width: '120px'}}/>
                                </Link></h1>
                            </div>
                        </div>
                        <div className="col-sm-8 form-search">
                            <InputGroup>
                                <FormControl onChange={e => setSearchValue(e.target.value)} />
                                <Link to={`${linkName.PHONE.DETAIL_INDEX}?phone_name=${searchValue || ""}`}>
                                    <Button className='btn-search' onClick={e => setIsShow(false)}>
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </Button>
                                </Link>
                            </InputGroup>
                            {isShow && <SearchItem data={data} setIsShow={setIsShow} />}
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
                                            {branches?.length > 0 && branches.map(item => {
                                                return <li key={item.id}><Link to={linkName.PHONE.BRANCH_INDEX + `/${item.slug}`}>{item.name}</Link></li>
                                            })}
                                        </ul>
                                    </div>
                                </Link>
                                <Link to={linkName.PHONE.BRANCH_INDEX + `/${branches[0]?.slug}`} className='nav-link'>{branches[0]?.name}</Link>
                                <Link to={linkName.PHONE.BRANCH_INDEX + `/${branches[1]?.slug}`} className='nav-link'>{branches[1]?.name}</Link>
                                <Link to={linkName.PHONE.BRANCH_INDEX + `/${branches[2]?.slug}`} className='nav-link'>{branches[2]?.name}</Link>
                                <Link to={linkName.BLOG.LIST} className='nav-link'>Bài viết</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    );
}
