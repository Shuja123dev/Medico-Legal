import React from 'react'
import { H2 } from '../../../user/components';
import { CardLayout } from '../../../user/containers';
import BlogImage from "./blogImg1.png";
import './Blogs.css';
import Data from "./Data";
import MdiDeleteOutline from './mdi_delete-outline.svg';
import BxEdit from "./bx_edit.svg"
import { useNavigate } from 'react-router-dom';
const BlogDetails = () => {
    const navigate = useNavigate();
    return (
        <>
            <H2 text={"BLOG DETAILS"} className='mb-4' />
            <CardLayout className='position_relative'>
                <span className="icons-blog">
                    <img className='icon' src={MdiDeleteOutline} alt="" />
                    <img className='icon' onClick={() => navigate("/admin/blogs/123/edit")} src={BxEdit} alt="" />
                </span>
                <img className='blogs-img' src={BlogImage} alt="" />
                <Data heading="Title" paragraph="Lorem ipsum dolor sit amet" />
                <Data heading="Description" paragraph="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" />
                <Data heading="Keywords" paragraph="perpiciatis, omnis" />
                <Data heading="Meta Tags" paragraph="perpiciatis, omnis" />
                <Data heading="Meta Description" paragraph="consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis" />
            </CardLayout >
        </>
    )
}

export default BlogDetails
