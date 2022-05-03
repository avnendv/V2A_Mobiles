import React, { useEffect, useState } from "react";

// Screens
import ScreensLayout from '../Layout/Layout';
import BlogCard from "../../components/Blog/BlogCard";
import blogApi from "../../api/Blog";

export default function Blog(){
    const [listBlog, setListBlog] = useState([]);

    useEffect(()=> {
        blogApi.getList()
        .then(response => {
            if (response.result === 1) {
                setListBlog(response.data.listBlog);
            }
        })
    }, []);
    return(
        <ScreensLayout>
            <div className="container blog">
                {listBlog.length > 0 && listBlog.map(item => {
                    return <BlogCard key={item.id} data={item} />;
                })}
            </div>
        </ScreensLayout>
    );
}
