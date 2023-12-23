import React, { useEffect, useState } from 'react'
import { H2 } from '../../../user/components';
import { CardLayout } from '../../../user/containers';
import BlogImage from "./blogImg1.png";
import './Blogs.css';
import Data from "./Data";
import MdiDeleteOutline from './mdi_delete-outline.svg';
import BxEdit from "./bx_edit.svg"
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
const BlogDetails = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const BlogId = location.pathname.split('/').pop();
    const [blogDetails, setBlogDetails] = useState();


    const getBlogById = async () => {
        await axios.post("http://202.182.110.16/medical/api/login", {
            PhoneNo: "03325501021",
            Password: "abc123"
        }).then(async response => {
            const token = response.data.token;
            await axios.post("http://202.182.110.16/medical/api/getblogbyid", {
                BlogId: BlogId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log(res);
                setBlogDetails(res.data.response.data[0])
            }).catch(error => {
                console.log(error);
            })
        })
    }

    const formatDate = (inputDateString) => {
        const inputDate = new Date(inputDateString);
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        return inputDate.toLocaleDateString('en-GB', options);
    }

    useEffect(() => {
        getBlogById();
    }, [])

    return (
        <>
            <H2 text={"BLOG DETAILS"} className='mb-4' />
            <CardLayout className='position_relative'>
                <span className="icons-blog">
                    <img className='icon' src={MdiDeleteOutline} alt="" />
                    <img className='icon' onClick={() => navigate(`/admin/blogs/${BlogId}/edit`)} src={BxEdit} alt="" />
                </span>
                <img className='blogs-img' src={blogDetails && blogDetails.BlogImage} alt="" />
                <Data heading="Title" paragraph={blogDetails && blogDetails.Title} />
                <Data heading="Description" paragraph={blogDetails && blogDetails.BlogText} />
                <Data heading="Date Created" paragraph={blogDetails && formatDate(blogDetails.BlotTime)} />
                <Data heading="Writer" paragraph={blogDetails && blogDetails.Witer} />
                <Data heading="Meta Description" paragraph="consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis" />
            </CardLayout >
        </>
    )
}

export default BlogDetails
