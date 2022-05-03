import React from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import linkName from '../../constants/linkName';
import { formatDate } from '../../helper/helper';
export default function BlogCard(props) {
    const {data} = props;
    return (
        <div className="row blog-item">
            <div className="col-3">
                <Link to={linkName.BLOG.LIST + `/${data.slug}`}>
                    <img src={data.image} alt={data.title} />
                </Link>
            </div>
            <div className="col-9">
                <Link to={linkName.BLOG.LIST + `/${data.slug}`}>
                    <div className="blog-title">{data.title}</div>
                </Link>
                <div className="blog-info">
                    <Badge bg="dark">Tin hot</Badge>
                    <div className="blog-info-time">{formatDate(data.updated_at)}</div>
                    <div className="blog-info-view">
                        <i class="fa fa-eye" aria-hidden="true"></i> {data.view}
                    </div>
                </div>
            </div>
            <div className="col-12">
                <hr className="mt-4"/>
            </div>
        </div>
    );
}
