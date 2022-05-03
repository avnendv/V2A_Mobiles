const formatPrice = (price) => {
    return (new Intl.NumberFormat('en-IN').format(price)) + ' đ';
}

export const formatDate = (date) => {
    let dateCustom = new Date(date);
    return `ngày ${dateCustom.getDate()} tháng ${dateCustom.getMonth() + 1} năm ${dateCustom.getFullYear()}`;
}

export const options = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
};
export default formatPrice;