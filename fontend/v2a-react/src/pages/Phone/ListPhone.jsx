import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import PhoneCard from "../../components/Phone/PhoneCard";
import PhoneFilter from "../../components/Phone/PhoneFilter";

// Screens
import ScreensLayout from '../Layout/Layout';

export default function ListPhone(){
    return(
        <ScreensLayout>
            <div className="container list-phone">
                <Breadcrumb page='Điện thoại'/>
                <PhoneFilter/>
                <h2>Điện thoại</h2>
                <div className="single-product-area">
                    <div className="row">
                        {
                            [1,2,3,4,5,6,7,8,9,10,11,12].map((item, index) => {
                                return <div className="col-md-3 col-sm-6" key={index} ><PhoneCard phone={item} /></div>
                            })
                        }    
                    </div> 
                </div>
            </div> 
        </ScreensLayout>
    );
}
