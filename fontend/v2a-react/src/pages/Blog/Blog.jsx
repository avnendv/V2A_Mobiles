import React, { useEffect, useState } from "react";

// Screens
import ScreensLayout from '../Layout/Layout';
import BlogCard from "../../components/Blog/BlogCard";
import blogApi from "../../api/Blog";
import { toast } from "react-toastify";
import ERROR_MESSAGE from "../../constants/errors";
import { options } from "../../helper/helper";
import PageLoader from "../../components/PageLoader";

export default function Blog(){
    const [loading, setLoading] = useState(true);
    const [listBlog, setListBlog] = useState([]);

    useEffect(()=> {
        blogApi.getList()
        .then(response => {
            if (response.result === 1) {
                setListBlog(response.data.listBlog);
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
            <div className="container blog">
                {listBlog.length > 0 && listBlog.map(item => {
                    return <BlogCard key={item.id} data={item} />;
                })}
            </div>
            {loading && <PageLoader/>}
        </ScreensLayout>
    );
}
