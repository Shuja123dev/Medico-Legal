import React, { useEffect, useState } from 'react'
import { Button1, H2 } from '../../../user/components'
import { CardLayout } from '../../../user/containers'
import BlogImage from './blogImg1.png'
import Data from './Data';
import './Blogs.css';
import { InputBox } from '../../../user/components';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
const EditBlog = () => {

    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_BASE_URL;
    const token = Cookies.get('token');

    const location = useLocation();
    const BlogId = location.pathname.split('/')[3];
    const [blogDetails, setBlogDetails] = useState();

    console.log(BlogId);

    const getBlogById = async () => {
        await axios.post(baseURL + "/api/getblogbyid", {
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
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        setBlogDetails({
            ...blogDetails,
            [name]: value
        })
    }

    const updateBlog = async (event) => {
        event.preventDefault();
        await axios.post(baseURL + "/api/updateblog", {
            BlogId: BlogId,
            Title: blogDetails.Title,
            BlogTime: "2023-12-02 12:12:12",
            Writer: blogDetails.Writer,
            BlogText: blogDetails.BlogText,
            Status: blogDetails.Status,
            MetaDescription: blogDetails.MetaDescription,
            Kewords: blogDetails.Kewords,
            MetaTags: blogDetails.MetaTags,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            navigate("/admin/blogs")
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        getBlogById();
    }, [])



    return (
        <>
            <H2 text={"BLOG"} className='mb-4' />
            <CardLayout className='position_relative'>
                <div className='img-container flex-box'>
                    <h5 className='blog-img-upload-heading'>+ UPLOAD IMAGE</h5>
                    {/* <img className='blogs-img' src={blogDetails && blogDetails.BlogImage} alt="" /> */}
                    <img className='blogs-img' src={BlogImage} alt="" />
                </div>
                <form action="" onSubmit={updateBlog}>
                    <Data heading="Title" />
                    <InputBox
                        className='blog-input'
                        type={"text"}
                        nameIdHtmlFor={"Title"}
                        onChange={handleChange}
                        value={blogDetails && blogDetails.Title}
                    />
                    <Data heading="Description" />
                    <InputBox
                        className='blog-input-description'
                        type={"textarea"}
                        rows={7}
                        nameIdHtmlFor={"BlogText"}
                        onChange={handleChange}
                        value={blogDetails && blogDetails.BlogText}
                    />

                    <Data heading="Keywords" />
                    <InputBox
                        className='blog-input'
                        type={"text"}
                        nameIdHtmlFor={"Keywords"}
                        onChange={handleChange}
                        placeholder="Keywords  (comma separated) "
                        value={blogDetails && blogDetails.Keywords}
                    />
                    <Data heading="Meta Tags" />
                    <InputBox
                        className='blog-input'
                        type={"text"}
                        nameIdHtmlFor={"MetaTags"}
                        onChange={handleChange}
                        placeholder="Tags  (comma separated)"
                        value={blogDetails && blogDetails.MetaTags}
                    />
                    <Data heading="Meta Description" />
                    <InputBox
                        className='blog-input'
                        type={"text"}
                        placeholder="Description"
                        nameIdHtmlFor={"MetaDescription"}
                        onChange={handleChange}
                        value={blogDetails && blogDetails.MetaDescription}
                    />
                    <div className="d-flex align-items-center justify-content-end my-3 mt-5">
                        <Button1 type="submit" text={"Publish"}></Button1>
                    </div>
                </form>
            </CardLayout >
        </>
    )
}

export default EditBlog
