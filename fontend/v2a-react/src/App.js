import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import LinkName from "./constants/linkName";
import PageLoader from './components/PageLoader';
import Home from "./pages/Home/Home";
import ListPhone from "./pages/Phone/ListPhone";
import Phone from "./pages/Phone/Phone";
import Blog from "./pages/Blog/Blog";
import BlogDetail from "./pages/Blog/BlogDetail";
import Cart from "./pages/Cart/Cart";
import Pay from "./pages/Cart/Pay";

/**
 *
 * @returns
 */
export default function App() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path={LinkName.CART} element={<Cart />} />
                <Route exact path={LinkName.ORDER} element={<Pay />} />
                <Route exact path={LinkName.PHONE.BRANCH} element={<ListPhone />} />
                <Route exact path={LinkName.PHONE.DETAIL_INDEX} element={<ListPhone />} />
                <Route exact path={LinkName.PHONE.DETAIL} element={<Phone />} />
                <Route exact path={LinkName.BLOG.LIST} element={<Blog />} />
                <Route exact path={LinkName.BLOG.DETAIL} element={<BlogDetail />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </Suspense>
    );
}
