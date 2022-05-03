import linkName from "../constants/linkName";
import axiosClient from "./axiosClient";

const blogApi = {
    getList: (params) => {
        const url = linkName.BLOG.LIST_INDEX;
        return axiosClient.get(url, {params});
    },
    getDetail: (slug) => {
        const url = linkName.BLOG.LIST_INDEX + `/${slug}`;
        return axiosClient.get(url);
    },
}

export default blogApi;