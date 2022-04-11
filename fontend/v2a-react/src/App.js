import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PageLoader from './components/PageLoader';
import Home from "./pages/Home/Home";
import './App.scss';
import LinkName from "./constants/linkName";

/**
 *
 * @returns
 */
export default function App() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route exact path={LinkName.HOME} element={<Home />} />
            </Routes>
        </Suspense>
    );
}
