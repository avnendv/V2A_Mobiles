import linkName from "../constants/linkName";
import axiosClient from "./axiosClient";

const homeApi = {
    getTop: () => {
        const url = linkName.HOME.TOP;
        return axiosClient.get(url);
    },
    getListPhone: (params) => {
        const url = linkName.HOME.PHONE;
        return axiosClient.get(url, {params});
    },
    getBranch: () => {
        const url = linkName.BRANCH;
        return axiosClient.get(url);
    }
}

export default homeApi;