import React from "react";
import PhoneLastest from "../../components/Home/PhoneLastest";
import SliderTop from "../../components/SliderTop";
import 'antd/dist/antd.css';

// Screens
import ScreensLayout from '../Layout/Layout';
import PhoneWidgetArea from "../../components/Home/PhoneWidgetArea";

export default function Home(){
    return(
        <ScreensLayout>
            <SliderTop/>
            <PhoneLastest/>
            <PhoneWidgetArea/>
        </ScreensLayout>
    );
}
