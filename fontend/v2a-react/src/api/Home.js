import linkName from "../constants/linkName";
import BaseApi from "./BaseApi"

export default class HomeApi extends BaseApi {
    // eslint-disable-next-line no-useless-constructor
    constructor(ctor) {
        super(ctor);
    }
    getAllPhone() {
        const url = linkName.PHONE;
        return this.axios.get(url);
    }
    getPhoneByRate() {
        const url = 'url';
        return this.axios.get(url);
    }
    getPhoneByView() {
        const url = 'url';
        return this.axios.get(url);
    }
}