import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import homeApi from "../../api/Home";
import phoneApi from "../../api/Phone";
import Breadcrumb from "../../components/Breadcrumb";
import PageLoader from "../../components/PageLoader";
import PhoneCard from "../../components/Phone/PhoneCard";
import PhoneFilter from "../../components/Phone/PhoneFilter";
import ERROR_MESSAGE from "../../constants/errors";
import { options } from "../../helper/helper";

// Screens
import ScreensLayout from '../Layout/Layout';

export default function ListPhone(){
    const params = useParams();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
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
            setLoading(false);
        })
        .catch(error => {
            toast.error(ERROR_MESSAGE, options);
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
            setLoading(false);
        })
        .catch(error => {
            toast.error(ERROR_MESSAGE, options);
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

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [loading]);
    
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
            {loading && <PageLoader/>}
        </ScreensLayout>
    );
}
