import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import 'antd/dist/antd.css';
import './App.scss';
import LinkName from "./constants/linkName";
import PageLoader from './components/PageLoader';
import Home from "./pages/Home/Home";
import ListPhone from "./pages/Phone/ListPhone";
import Phone from "./pages/Phone/Phone";

/**
 *
 * @returns
 */
export default function App() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route exact path={LinkName.HOME} element={<Home />} />
                <Route exact path={LinkName.PHONE} element={<ListPhone />} />
                <Route exact path={LinkName.PHONE + '/chi-tiet'} element={<Phone />} />
            </Routes>
        </Suspense>
    );
}
