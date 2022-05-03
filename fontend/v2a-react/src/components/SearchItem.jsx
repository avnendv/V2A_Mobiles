import React from 'react';
import { Link } from 'react-router-dom';
import linkName from '../constants/linkName';
import formatPrice from '../helper/helper';

export default function SearchItem(props) {
    const {data, setIsShow} = props;
    return (
        <>
            <div className="search-list">
                <div className="search-close"><i class="fa fa-times" aria-hidden="true" onClick={e => setIsShow(false)}></i></div>
                {data?.length ? data.map(item => {
                    return <div className="search-item row" key={item.id}>
                                <div className="col-3 search-item-img">
                                    <Link to={linkName.PHONE.DETAIL_INDEX + `/${item.slug}`}>
                                        <img src={item.image} alt="" />
                                    </Link>
                                </div>
                                <div className="col-7">
                                    <Link to={linkName.PHONE.DETAIL_INDEX + `/${item.slug}`}>
                                        <div className="search-item-name">{item.name}</div>
                                    </Link>
                                    <div className="search-item-price">{formatPrice(item.price)}</div>
                                </div>
                            </div>
                    })
                    :
                    <div className="text-center fst-italic">Không tìm thấy điện thoại nào!</div>
                }
            </div>
        </>
    );
}
