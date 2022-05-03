import linkName from "../constants/linkName";
import axiosClient from "./axiosClient";

const phoneApi = {
    getList: (params) => {
        const url = linkName.PHONE.BRANCH;
        return axiosClient.get(url, {params});
    },
    getListBranch: (slug) => {
        const url = linkName.BRANCH + `/${slug}`;
        return axiosClient.get(url);
    },
    getDetail: (slug) => {
        const url = linkName.HOME.PHONE + `/${slug}`;
        return axiosClient.get(url);
    },
}

export default phoneApi;