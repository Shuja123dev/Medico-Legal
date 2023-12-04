import React from 'react'
import { CardLayout } from '../../../user/containers'
import ClientAvatar from "./clientAvatar.png"
import { Button1, H2, H3, InputBox } from '../../../user/components'
import { NavLink } from 'react-router-dom'


const EditAdmin = () => {
    return (
        <>
            <H2 text={"EDIT ADMIN DETAILS"} className='mb-4 ' />
            <CardLayout>
                <div className='flex_box px-1' style={{ justifyContent: "start" }}>
                    <H3 text={"Admin Details"} />
                </div>
                <div className="row my-4 mb-5">
                    <div className="col-md-2 col-sm-12">
                        <img className='expert-main-img' src={ClientAvatar} alt="" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-md-12">
                        <div className="row mb-3" style={{ gap: '2rem' }}>
                            <div className="col-md-5 col-sm-12 mb-3">
                                <label className='experts-label support_light_txt mb-2' htmlFor="">NAME</label>
                                <InputBox type={"text"} placeholder={"Name of the Case"} />
                            </div>
                            <div className="col-md-5 col-sm-12  mb-3">
                                <label className='experts-label support_light_txt mb-2' htmlFor="">ROLE</label>
                                <InputBox type={"select"} options={[
                                    "Admin", "Super Admin"
                                ]} />
                            </div>
                        </div>
                        <div className="row mb-3" style={{ gap: '2rem' }}>
                            <div className="col-md-5 col-sm-12 mb-3">
                                <label className='experts-label support_light_txt mb-2' htmlFor="">PHONE NO</label>
                                <div className="ph-number">+966<InputBox className='expert-input-alter mx-2 col-md-11' type={"text"} value="14847 9797" /></div>
                            </div>
                            <div className="col-md-5 col-sm-12 mb-3">
                                <label className='experts-label support_light_txt mb-2' htmlFor="">STATUS</label>
                                <InputBox type={"select"} options={[
                                    "Active", "Deactive"
                                ]} />
                            </div>
                        </div>
                        <div className="row mb-3" style={{ gap: '2rem' }}>
                            <div className="col-md-5 col-sm-12 mb-3">
                                <label className='experts-label support_light_txt mb-2' htmlFor="">PASSWORD</label>
                                <InputBox type={"text"} placeholder={"Name of the Case"} />
                            </div>
                            <div className="col-md-5 col-sm-12 mb-3 d-flex align-items-end justify-content-end">
                                <NavLink to={"/admin/admins"}>
                                    <Button1 text={"Update"} className='px-4' />
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </CardLayout>
        </>
    )
}

export default EditAdmin
