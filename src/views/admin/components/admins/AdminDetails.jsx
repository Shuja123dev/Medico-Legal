import React from 'react'
import { H2, H4 } from '../../../user/components'
import { CardLayout } from '../../../user/containers'
import ClientAvatar from "./clientAvatar.png"

const AdminDetails = () => {
    return (
        <>
            <H2 text={"ADMIN DETAILS"} className='mb-4 ' />
            <CardLayout>
                <div className='flex_box px-1' style={{ justifyContent: "start" }}>
                    <label className='experts-label support_light_txt' htmlFor="">PROFILE PICTURE</label>
                </div>
                <div className="row my-4 mb-5">
                    <div className="col-md-2 col-sm-12">
                        <img className='expert-main-img' src={ClientAvatar} alt="" />
                    </div>
                </div>
                <div className="row flex-direction-column">
                    <div className="col-lg-6 col-md-12 my-2">
                        <div className="row">
                            <H4 text={"NAME"} className='support_light_txt col-md-6' />
                            <p className='col-md-6'>Name of the case</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 my-2">
                        <div className="row">
                            <H4 text={"ROLE"} className='support_light_txt col-md-6' />
                            <p className='col-md-6'>Admin</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 my-2">
                        <div className="row">
                            <H4 text={"STATUS"} className='support_light_txt col-md-6' />
                            <p className='col-md-6'>Active</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 my-2">
                        <div className="row">
                            <H4 text={"PHONE NO"} className='support_light_txt col-md-6' />
                            <p className='col-md-6'>+966 - 12345678</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 my-2">
                        <div className="row">
                            <H4 text={"PASSWORD"} className='support_light_txt col-md-6' />
                            <p className='col-md-6'>Password</p>
                        </div>
                    </div>
                </div>
            </CardLayout>
        </>
    )
}

export default AdminDetails
