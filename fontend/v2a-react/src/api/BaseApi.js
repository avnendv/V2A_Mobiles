import axios from 'axios';

export default class BaseApi {
    constructor() {
        // Base url
        this.baseURL = 'http://localhost:3001';

        // init object axios
        this.axios = this.getAxiosClient();
    }

    /**
     * get object axios
     * 
     * @returns axios
     */
    getAxiosClient = () => {
        const _this = this;
        const axiosClient = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': "multipart/form-data",
            },
        });

        // Interceptors
        // Add a request interceptor
        axiosClient.interceptors.request.use(function (config) {
            // Do something before request is sent

            // result check send array empty with url
            const isSendArrayEmpty = _this.checkSendArrayEmpty(config.url);

            // convert object into form-data
            const _data = config.data;
            let formData = new FormData();
            for ( const key in _data ) {
                _this.append2FormData(formData, _data[key], key, isSendArrayEmpty);
            }

            config.data = formData;

            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });

        // Add a response interceptor
        axiosClient.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        });

        return axiosClient;
    }

    /**
     * function check send array empty
     * 
     * @param {*} url 
     * @returns boolean
     */
    checkSendArrayEmpty = (url) => {
        const _aryUrl = {
            // url => 1
        };

        return _aryUrl[url];
    }

    /**
     * append data into form data
     * 
     * @param {object} formData 
     * @param {mixed} values 
     * @param {string} name 
     * @returns Object
     */
    append2FormData = (formData, values, name, isSendArrayEmpty) => {
        if(!values && name)
            formData.append(name, '');
        else{
            if(typeof values === 'object'){
                if (isSendArrayEmpty && JSON.stringify(values) === '[]') {
                    formData.append(name, '');
                } else {
                    for(const key in values){
                        if(typeof values[key] === 'object') {
                            this.append2FormData(formData, values[key], name + '[' + key + ']', isSendArrayEmpty);
                        } else {
                            formData.append(name + '[' + key + ']', values[key]);
                        }
                    }
                }
            } else {
                formData.append(name, values);
            }
        }
    
        return formData;
    }

}
