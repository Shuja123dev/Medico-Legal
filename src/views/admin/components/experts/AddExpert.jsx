import React from 'react'
import { Button1, H2, InputBox } from '../../../user/components'
import { CardLayout } from '../../../user/containers'
import ClientAvatar from "./clientAvatar.png"
import "./Expert.css";
import { NavLink } from 'react-router-dom';
const AddExpert = ({ type = "experts" }) => {
    return (
        <>
            <H2 text={"ADD EXPERT"} className='mb-4'></H2>
            <CardLayout className='expertsCrd'>
                <div className='flex_box px-1' style={{ justifyContent: "start" }}>
                    <label className='experts-label' htmlFor="">PROFILE PICTURE</label>
                </div>
                <div className="row">
                    <div className="col-md-3  col-md-2 p-4">
                        <img className='expert-main-img' src={ClientAvatar} alt="" />
                    </div>
                    <div className="col-xl-6 col-lg-9 col-md-10">
                        <div className="row expertInputBox">
                            <div class="col-lg-6 col-md-12">
                                <label class="support_light_txt mb-2">NAME</label>
                                <InputBox type={"text"} value="Name of the user" />
                            </div>
                            <div class="col-lg-6 col-md-12">
                                <label class="support_light_txt mb-2">YEAR OF EXPERIENCE</label>
                                <InputBox type={"text"} value="10" />
                            </div>
                            <div class="col-lg-6 col-md-12">
                                <label class="support_light_txt mb-2">EXPERTISE</label>
                                <InputBox type={"text"} value="Public court" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="row expertInputBox expertInputBox2">
                            <div class="col-lg-6 col-md-12">
                                <label class="support_light_txt mb-2">NAME</label>
                                <InputBox type={"text"} value="Name of the user" />
                            </div>
                            <div class="col-lg-6 col-md-12">
                                <label class="support_light_txt mb-2">YEAR OF EXPERIENCE</label>
                                <InputBox type={"text"} value="10" />
                            </div>
                            <div class="col-lg-6 col-md-12">
                                <label class="support_light_txt mb-2">YEAR OF EXPERIENCE</label>
                                <div className="ph-number">+966<InputBox className='expert-input-alter mx-2' type={"text"} value="14847 9797" /></div>
                            </div>
                            <div class="col-lg-6 col-md-12">
                                <label class="support_light_txt mb-2">EXPERTISE</label>
                                <InputBox type={"text"} value="Public court" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12"></div>
                </div>
                <div className="d-flex justify-content-end">
                    <NavLink to={`/admin/${type}`}>
                        <Button1 text={"Add"} />
                    </NavLink>
                </div>
            </CardLayout >
        </>
    )
}

export default AddExpert