import linkName from "../constants/linkName";
import axiosClient from "./axiosClient";

const orderApi = {
    createOrder: (params) => {
        const url = linkName.ORDER_INDEX;
        return axiosClient.post(url, params);
    },
}

export default orderApi;