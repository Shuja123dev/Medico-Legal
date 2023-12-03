import React from 'react'
import { Button1, H2 } from '../../../user/components'
import { CardLayout } from '../../../user/containers'
import BlogImage from './blogImg1.png'
import Data from './Data';
import './Blogs.css';
import { InputBox } from '../../../user/components';
const EditBlog = () => {
    return (
        <>
            <H2 text={"BLOG"} className='mb-4' />
            <CardLayout className='position_relative'>
                <div className='img-container flex-box'>
                    <h5 className='blog-img-upload-heading'>+ UPLOAD IMAGE</h5>
                    <img className='blogs-img' src={BlogImage} alt="" />
                </div>
                <form action="">
                    <Data heading="Title" />
                    <InputBox
                        className='blog-input'
                        type={"text"}
                        value="Lorem ipsum dolor sit amet"
                    />
                    <Data heading="Description" />
                    <InputBox
                        className='blog-input-description'
                        type={"textarea"}
                        rows={7}
                        value="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                    />

                    <Data heading="Keywords" />
                    <InputBox
                        className='blog-input'
                        type={"text"}
                        placeholder="Keywords  (comma separated) "
                    />
                    <Data heading="Meta Tags" />
                    <InputBox
                        className='blog-input'
                        type={"text"}
                        placeholder="Tags  (comma separated)"
                    />
                    <Data heading="Meta Description" />
                    <InputBox
                        className='blog-input'
                        type={"text"}
                        placeholder="Description"
                    />
                    <div className="d-flex align-items-center justify-content-end my-3 mt-5">
                        <Button1 type="submit" onClick={() => navigate("/admin/blogs")} text={"Publish"}></Button1>
                    </div>
                </form>
            </CardLayout >
        </>
    )
}

export default EditBlog
