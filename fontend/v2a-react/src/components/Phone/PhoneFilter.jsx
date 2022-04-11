import React from 'react';
export default function PhoneFilter(props) {
    return (
        <div className="product-filters">
            <div className="left">
                <strong className="label">Lọc danh sách:</strong>
                <div className="facet">
                    <label>Danh mục <i className="ms-1 fa fa-angle-down" aria-hidden="true"></i></label>
                    <div className="sub">
                        <ul>
                            <li><a href="/dien-thoai-di-dong/iphone">iPhone</a></li>
                            <li><a href="/dien-thoai-di-dong/xor">XOR</a></li>
                            <li><a href="/dien-thoai-di-dong/samsung">Samsung</a></li>
                            <li><a href="/dien-thoai-di-dong/xiaomi">Xiaomi</a></li>
                            <li><a href="/dien-thoai-di-dong/realme">realme</a></li>
                            <li><a href="/dien-thoai-di-dong/nokia">Nokia</a></li>
                            <li><a href="/dien-thoai-di-dong/oppo">OPPO</a></li>
                            <li><a href="/dien-thoai-di-dong/blackberry">Blackberry</a></li>
                            <li><a href="/dien-thoai-di-dong/vivo">Vivo</a></li>
                            <li><a href="/dien-thoai-di-dong/energizer">Energizer</a></li>
                            <li><a href="/dien-thoai-di-dong/masstel">Masstel</a></li>
                            <li><a href="/dien-thoai-di-dong/philips">Philips</a></li>
                            <li><a href="/dien-thoai-di-dong/itel">Itel</a></li>
                            <li><a href="/dien-thoai-di-dong/bphone">BPhone</a></li>
                            <li><a href="/dien-thoai-di-dong/ngung-kinh-doanh">Ngừng kinh doanh</a></li>
                            <li><a href="/dien-thoai-di-dong/tecno">TECNO</a></li>
                        </ul>
                    </div>
                </div>
                <div className="facet">
                    <label>
                        Thương hiệu <i className="ms-1 fa fa-angle-down" aria-hidden="true"></i>
                    </label>
                    <div className="sub">
                        <ul>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;brand&quot;:&quot;216&quot;}&amp;search=true">XOR <i className="total">(13)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;brand&quot;:&quot;12&quot;}&amp;search=true">Vivo <i className="total">(12)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;brand&quot;:&quot;20&quot;}&amp;search=true">Nokia <i className="total">(12)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;brand&quot;:&quot;82&quot;}&amp;search=true">realme <i className="total">(10)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;brand&quot;:&quot;76&quot;}&amp;search=true">Energizer <i className="total">(5)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;brand&quot;:&quot;115&quot;}&amp;search=true">Hoanghamobile <i className="total">(3)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;brand&quot;:&quot;214&quot;}&amp;search=true">TECNO <i className="total">(3)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;brand&quot;:&quot;24&quot;}&amp;search=true">Philips <i className="total">(2)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;brand&quot;:&quot;114&quot;}&amp;search=true">Itel <i className="total">(1)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;brand&quot;:&quot;1&quot;}&amp;search=true">Apple <i className="total">(42)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;brand&quot;:&quot;4&quot;}&amp;search=true">Samsung <i className="total">(29)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;brand&quot;:&quot;7&quot;}&amp;search=true">Oppo <i className="total">(14)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;brand&quot;:&quot;8&quot;}&amp;search=true">Asus <i className="total">(1)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;brand&quot;:&quot;3&quot;}&amp;search=true">Xiaomi <i className="total">(22)</i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="facet">
                    <label>
                        Giá <i className="ms-1 fa fa-angle-down" aria-hidden="true"></i>
                    </label>
                    <div className="sub">
                        <ul>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;price&quot;:&quot;T100t&quot;}&amp;search=true">Trên 100 triệu <i className="total">(8)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;price&quot;:&quot;1t&quot;}&amp;search=true">Dưới 1 triệu <i className="total">(22)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;price&quot;:&quot;1t-2t&quot;}&amp;search=true">1 đến 2 triệu <i className="total">(3)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;price&quot;:&quot;2t-3t&quot;}&amp;search=true">2 đến 3 triệu <i className="total">(13)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;price&quot;:&quot;3t-4t&quot;}&amp;search=true">3 đến 4 triệu <i className="total">(14)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;price&quot;:&quot;4t-5t&quot;}&amp;search=true">4 đến 5 triệu <i className="total">(9)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;price&quot;:&quot;5t-6t&quot;}&amp;search=true">5 đến 6 triệu <i className="total">(14)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;price&quot;:&quot;6t-8t&quot;}&amp;search=true">6 đến 8 triệu <i className="total">(9)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;price&quot;:&quot;8t-10t&quot;}&amp;search=true">8 đến 10 triệu <i className="total">(9)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;price&quot;:&quot;10t-12t&quot;}&amp;search=true">10 đến 12 triệu <i className="total">(7)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;price&quot;:&quot;12t-15t&quot;}&amp;search=true">12 đến 15 triệu <i className="total">(8)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;price&quot;:&quot;15t-20t&quot;}&amp;search=true">15 đến 20 triệu <i className="total">(12)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;price&quot;:&quot;20t-100tr&quot;}&amp;search=true">20 đến 100 triệu <i className="total">(44)</i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="facet">
                    <label>
                        Loai sản phẩm <i className="ms-1 fa fa-angle-down" aria-hidden="true"></i>
                    </label>
                    <div className="sub">
                        <ul>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;type&quot;:&quot;1&quot;}&amp;search=true">Điện thoại di động <i className="total">(177)</i></a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;type&quot;:&quot;3&quot;}&amp;search=true">Laptop <i className="total">(1)</i></a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="right">
                <div className="facet">
                    <label>Sắp xếp <i className="ms-1 fa fa-angle-down" aria-hidden="true"></i></label>
                    <div className="sub">
                        <ul>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;sort&quot;:&quot;1&quot;}&amp;search=true">Sản phẩm mới - cũ</a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;sort&quot;:&quot;2&quot;}&amp;search=true">Giá thấp đến cao</a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;sort&quot;:&quot;3&quot;}&amp;search=true">Giá cao đến thấp</a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;sort&quot;:&quot;4&quot;}&amp;search=true">Mới cập nhật</a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;sort&quot;:&quot;5&quot;}&amp;search=true">Sản phẩm cũ</a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;sort&quot;:&quot;6&quot;}&amp;search=true">Xem nhiều hôm nay</a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;sort&quot;:&quot;7&quot;}&amp;search=true">Xem nhiều tuần này</a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;sort&quot;:&quot;8&quot;}&amp;search=true">Xem nhiều tháng này</a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;sort&quot;:&quot;10&quot;}&amp;search=true">Xem nhiều năm nay</a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;sort&quot;:&quot;9&quot;}&amp;search=true">Xem nhiều nhất</a></li>
                            <li><a href="/dien-thoai-di-dong?filters={&quot;sort&quot;:&quot;11&quot;}&amp;search=true">Kết quả tìm kiếm</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
