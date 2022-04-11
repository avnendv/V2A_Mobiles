import React from "react";

// Screens
import PhoneLastest from "../../components/Home/PhoneLastest";
import SliderTop from "../../components/SliderTop";
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
