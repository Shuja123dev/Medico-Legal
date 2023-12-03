import React from 'react'
import { H2 } from '../../../user/components'
import './Blogs.css';
import Data from './Data';
import { InputBox } from '../../../user/components';
import { CardLayout } from '../../../user/containers';
import { Button1 } from '../../../user/components';
import { useNavigate } from 'react-router-dom';
const AddBlog = () => {
    const navigate = useNavigate();
    return (
        <>
            <H2 text={"NEW BLOG"} className='mb-4' />
            <CardLayout className='position_relative'>

                <div className="add-img-block flex-box">
                    <h5 className='upload-heading'>+UPLOAD IMAGE</h5>
                </div>
                <form action="">
                    <Data heading="Title" />
                    <InputBox
                        className='blog-input'
                        type={"text"}
                        placeholder=""
                    />
                    <Data heading="Description" />
                    <InputBox
                        rows={7}
                        className='blog-input-description'
                        type={"textarea"}
                        placeholder=""
                    />

                    <Data heading="Keywords" />
                    <InputBox
                        className='blog-input'
                        type={"text"}
                        placeholder=""
                    />
                    <Data heading="Meta Tags" />
                    <InputBox
                        className='blog-input'
                        type={"text"}
                        placeholder=""
                    />
                    <Data heading="Meta Description" />
                    <InputBox
                        className='blog-input'
                        type={"text"}
                        placeholder=""
                    />
                    <div className="d-flex align-items-center justify-content-end my-3 mt-5">
                        <Button1 type="submit" onClick={() => navigate("/admin/blogs")} text={"Publish"}></Button1>
                    </div>
                </form>
            </CardLayout >
        </>
    )
}

export default AddBlog
