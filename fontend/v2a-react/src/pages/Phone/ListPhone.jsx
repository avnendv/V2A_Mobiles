import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import homeApi from "../../api/Home";
import phoneApi from "../../api/Phone";
import Breadcrumb from "../../components/Breadcrumb";
import PhoneCard from "../../components/Phone/PhoneCard";
import PhoneFilter from "../../components/Phone/PhoneFilter";

// Screens
import ScreensLayout from '../Layout/Layout';

export default function ListPhone(){
    const params = useParams();
    const [searchParams] = useSearchParams();
    const [listPhone, setListPhone] = useState([]);
    const [branch, setBranch] = useState(null);
    const keySearch = searchParams.get("phone_name");

    const getApiListBranch = () => {
        phoneApi.getListBranch(params.slug)
        .then(response => {
            if (response.result === 1) {
                setListPhone(response.data.phones.listPhone);
                setBranch(response.data?.branch_name);
            }
        })
    }
    const getApiSearch = () => {
        const search = {
            phone_name: keySearch,
            is_search: 0,
        };
        homeApi.getListPhone(search)
        .then(response => {
            if (response.result === 1) {
                setListPhone(response.data.listPhone);
            }
        })
    }
    useEffect(() => {
        if (params.slug) {
            getApiListBranch();
        }
        if (keySearch) {
            getApiSearch();
        }
    }, [params.slug, keySearch]);
    return(
        <ScreensLayout>
            <div className="container list-phone">
                <Breadcrumb page={branch}/>
                <PhoneFilter/>
                {branch && <h2>Điện thoại {branch}</h2>}
                {keySearch && <h2>Từ khoá tìm kiếm "{keySearch}"</h2>}
                {listPhone?.length > 0 ?
                    <div className="single-product-area">
                        <div className="row">
                            {
                                listPhone.map((item) => {
                                    return <div className="col-md-3 col-sm-6" key={item.id} ><PhoneCard phone={item} /></div>
                                })
                            }    
                        </div> 
                    </div>
                :
                    <div className="text-center text-danger fst-italic">Không tìm thấy điện thoại nào!</div>
                }
            </div> 
        </ScreensLayout>
    );
}
