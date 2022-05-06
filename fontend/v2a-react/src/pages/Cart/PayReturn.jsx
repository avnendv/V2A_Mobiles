import React from "react";
import ScreensLayout from "../Layout/Layout";
import { Link } from "react-router-dom";
const PayReturn = () => {
    return (
        <>
            <ScreensLayout>
                <div className="payReturn">
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan={2} className="header column">
                                    VnPay response
                                    {
                                        // value.get('phone')
                                    }
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="column">Mã đơn hàng</td>
                                <td className="column">
                                    {
                                        // value.get('vnp_TxnRef')
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className="column">Số tiền</td>
                                <td className="column">
                                    {
                                        // Number(value.get('vnp_Amount')) / 100
                                    }{" "}
                                    vnd
                                </td>
                            </tr>
                            <tr>
                                <td className="column">Nội dung thanh toán</td>
                                <td className="column">
                                    {
                                        // (value.get('vnp_OrderInfo')).replaceAll('+', ' ')
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className="column">Mã phản hồi</td>
                                <td className="column">
                                    {
                                        // value.get('vnp_ResponseCode')
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className="column">Mã giao dịch tại vnpay</td>
                                <td className="column">
                                    {
                                        // value.get('vnp_TransactionNo')
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className="column">Mã ngân hàng</td>
                                <td className="column">
                                    {
                                        // value.get('vnp_BankCode')
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className="column">Thời gian thanh toán</td>
                                <td className="column">
                                    {
                                        // value.get('vnp_PayDate')
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className="column">Trạng thái</td>
                                {
                                    // value.get('vnp_ResponseCode') === '00'
                                    //   ? <td className="column" style={{ color: 'blue' }}>Thanh toán thành công</td>
                                    //   : <td className="column" style={{ color: 'red' }}>Thanh toán thất bại</td>
                                }
                            </tr>
                        </tbody>
                    </table>
                    <div className="buttons">
                        <Link className="returnButton" to="/">
                            Quay lại trang sản phẩm
                        </Link>
                        <Link className="returnButton" to="/">
                            Xem đơn hàng
                        </Link>
                    </div>
                </div>
            </ScreensLayout>
        </>
    );
};

export default PayReturn;