import React, { useRef, useState } from 'react'
import { H2 } from '../../../user/components'
import './Blogs.css';
import Data from './Data';
import { InputBox } from '../../../user/components';
import { CardLayout } from '../../../user/containers';
import { Button1 } from '../../../user/components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AddBlog = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [imageSrc, setImgSrc] = useState();
    const [imageFile, setImgFile] = useState({
        name: "default.jpg"
    });
    const [blogInfo, setBlogInfo] = useState({
        Title: "",
        BlogTime: "",
        Writer: "",
        BlogText: "",
        BlogImage: ""
    })

    const uploadFile = () => {
        fileInputRef.current.click();
    }

    const handleChageFile = () => {
        setImgFile(fileInputRef.current.files[0]);
        const imgFile = fileInputRef.current.files[0]

        const reader = new FileReader();

        reader.onload = (e) => {
            setImgSrc(e.target.result)
        };
        reader.readAsDataURL(imgFile);
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        setBlogInfo({
            ...blogInfo,
            [name]: value
        })
    }

    const addBlog = async () => {
        const currentDate = new Date();
        await axios.post("http://202.182.110.16/medical/api/login", {
            PhoneNo: "03325501021",
            Password: "abc123"
        }).then(async response => {
            const token = response.data.token;
            await axios.post("http://202.182.110.16/medical/api/addblog", {
                Title: blogInfo.Title,
                Writer: blogInfo.Writer,
                BlogText: blogInfo.BlogText,
                BlogImage: imageFile.name,
                Status: 1,
                BlogTime: currentDate.toDateString()
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log(res);
            }).catch(error => {
                console.log(error);
            })
        })
    }

    const handleSubmit = (e) => {
        console.log("submit");
        e.preventDefault();
        addBlog();
    }

    return (
        <>
            <H2 text={"NEW BLOG"} className='mb-4' />
            <CardLayout className='position_relative'>

                <div className="add-img-block flex-box" onClick={uploadFile} style={{ backgroundImage: `url(${imageSrc && imageSrc})` }}>
                    <input type="file" ref={fileInputRef} onChange={handleChageFile} />
                    <h5 className='upload-heading'>+UPLOAD IMAGE</h5>
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <Data heading="Title" />
                    <InputBox
                        className='blog-input'
                        type={"text"}
                        placeholder=""
                        nameIdHtmlFor={"Title"}
                        value={blogInfo.Title}
                        onChange={handleChange}
                    />
                    <Data heading="Description" />
                    <InputBox
                        rows={7}
                        className='blog-input-description'
                        type={"textarea"}
                        placeholder=""
                        nameIdHtmlFor={"BlogText"}
                        value={blogInfo.BlogText}
                        onChange={handleChange}
                    />

                    {/* <Data heading="Keywords" />
                    <InputBox
                        className='blog-input'
                        type={"text"}
                        placeholder=""
                    /> */}
                    <Data heading="Writer" />
                    <InputBox
                        className='blog-input'
                        type={"text"}
                        placeholder=""
                        nameIdHtmlFor={"Writer"}
                        value={blogInfo.Writer}
                        onChange={handleChange}
                    />
                    {/* <Data heading="Meta Tags" />
                    <InputBox
                        className='blog-input'
                        type={"text"}
                        placeholder=""
                    /> */}
                    <Data heading="Meta Description" />
                    <InputBox
                        className='blog-input'
                        type={"text"}
                        placeholder=""
                    />
                    <div className="d-flex align-items-center justify-content-end my-3 mt-5">
                        <Button1 type="submit" text={"Publish"}></Button1>
                    </div>
                </form>
            </CardLayout >
        </>
    )
}

export default AddBlog
