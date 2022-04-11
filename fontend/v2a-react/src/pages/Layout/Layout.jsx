import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Footer from './Partials/Footer';
import Header from './Partials/Header';

export default function ScreensLayout(props) {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div>
            {props.hasHeader && <Header />}
            {props.children}
            {props.hasFooter && <Footer />}
        </div>
    );
}

ScreensLayout.defaultProps = {
    hasHeader: true,
    hasFooter: true,
};
