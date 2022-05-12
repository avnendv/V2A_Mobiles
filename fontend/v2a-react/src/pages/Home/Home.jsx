import React, { useEffect, useState } from "react";

// Screens
import PhoneLastest from "../../components/Home/PhoneLastest";
import SliderTop from "../../components/SliderTop";
import ScreensLayout from '../Layout/Layout';
import PhoneWidgetArea from "../../components/Home/PhoneWidgetArea";
import homeApi from "../../api/Home";
import { toast } from "react-toastify";
import ERROR_MESSAGE from "../../constants/errors";
import { options } from "../../helper/helper";
import PageLoader from "../../components/PageLoader";

export default function Home(){
    const [loading, setLoading] = useState(true);
    const [listPhone, setListPhone] = useState([]);
    const [topPhone, setTopPhone] = useState({});

    useEffect(()=> {
        Promise.all([homeApi.getListPhone(), homeApi.getTop()])
        .then(([listPhone, topPhone]) => {
            if (listPhone.result === 1) {
                setListPhone(listPhone.data.listPhone)
            }
            if (topPhone.result === 1) {
                setTopPhone({
                    phoneRate: topPhone.data.phoneRate,
                    phoneView: topPhone.data.phoneView,
                    phoneNew: topPhone.data.phoneNew,
                })
            }
            setLoading(false);
        })
        .catch(error => {
            toast.error(ERROR_MESSAGE, options);
        })
    }, []);
    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [loading]);
    return(
        <ScreensLayout>
            <SliderTop/>
            {listPhone && <PhoneLastest listPhone={listPhone}/>}
            {topPhone && <PhoneWidgetArea topPhone={topPhone}/>}
            {loading && <PageLoader/>}
        </ScreensLayout>
    );
}
