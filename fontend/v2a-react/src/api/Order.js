import linkName from "../constants/linkName";
import axiosClient from "./axiosClient";

const orderApi = {
    createOrder: (params) => {
        const url = linkName.ORDER_INDEX;
        return axiosClient.post(url, params);
    },
    vnpReturn: (params) => {
        const url = linkName.ORDER_RETURN_INDEX;
        return axiosClient.get(url + `?${params}`);
    },
    checkOrder: (params) => {
        const url = linkName.ORDER_CHECK_INDEX;
        return axiosClient.get(url, {params});
    },
    selfOrder: (params) => {
        const url = linkName.SELF_ORDER_INDEX;
        return axiosClient.get(url, {params});
    },
    cancelOrder: (params) => {
        const url = '/order/cancel';
        return axiosClient.post(url, params);
    },
}

export default orderApi;