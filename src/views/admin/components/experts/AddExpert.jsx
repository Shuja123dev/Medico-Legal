import React, { useState } from 'react'
import { Button1, H2, H3, InputBox } from '../../../user/components'
import { CardLayout } from '../../../user/containers'
import ClientAvatar from "./clientAvatar.png"
import "./Expert.css";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Dropzone from '../dropzone/Dropzone';

const AddExpert = ({ type = "experts" }) => {

    const [expertInfo, setExpertInfo] = useState({
        name: "",
        yearsOfExperience: "",
        expertise: "",
        email: "",
        phoneNo: "",
        nationalAddress: "",
        password: "",
        status: "active",
    });

    const changeExpert = () => {
        setExpertInfo({
            ...expertInfo,
            [e.target.name]: e.target.value
        });
    }

    const addExpert = async () => {
        await axios.post("http://202.182.110.16/medical/api/login", {
            PhoneNo: "03325501021",
            Password: "abc123"
        }).then(async response => {
            const token = response.data.token;
            await axios.post("http://202.182.110.16/medical/api/addexpert", {
                PhoneNo: "03325501021",
                Password: "abc123",
                UserPassword: "ExpertName",
                ExpertName: "ishtiaq"
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log(res);
            })
        })
    }

    return (
        <>
            <H2 text={"ADD EXPERT"} className='mb-4'></H2>
            <CardLayout className='expertsCrd'>
                <div className="expert_profile__info_div_outer">
                    <H3 text={"Personal Information"} />
                    <div className="expert_profile__info_div_inner">
                        <div className="expert_profile__picture_div">
                            <h5>{"Profile Picture"}</h5>
                            <Dropzone
                                content={<img src={ClientAvatar} alt="user" />}
                                className="align-items-start h-auto bg-transparent"
                            />
                        </div>
                        <InputBox
                            value={expertInfo.name}
                            nameIdHtmlFor={"name"}
                            label={"Name"}
                            type={"text"}
                            onChange={changeExpert}
                        />
                        <InputBox
                            value={expertInfo.yearsOfExperience}
                            nameIdHtmlFor={"yearsOfExperience"}
                            label={"Years Of Experience"}
                            type={"number"}
                            onChange={changeExpert}
                        />
                        <InputBox
                            value={expertInfo.expertise}
                            nameIdHtmlFor={"expertise"}
                            label={"Expertise"}
                            type={"text"}
                            onChange={changeExpert}
                        />
                    </div>
                </div>
                <H3 text={"Contact Information"} />
                <div className="expert_profile__info_div_inner" style={{ maxWidth: "40rem" }}>
                    <InputBox
                        value={expertInfo.email}
                        nameIdHtmlFor={"email"}
                        label={"Email"}
                        type={"email"}
                        onChange={changeExpert}
                    />
                    <InputBox
                        value={expertInfo.phoneNo}
                        nameIdHtmlFor={"phoneNo"}
                        label={"Phone No"}
                        type={"number"}
                        onChange={changeExpert}
                    />
                    <InputBox
                        value={expertInfo.nationalAddress}
                        nameIdHtmlFor={"nationalAddress"}
                        label={"National Address"}
                        type={"text"}
                        onChange={changeExpert}
                    />
                    <InputBox
                        value={expertInfo.password}
                        nameIdHtmlFor={"nationalAddress"}
                        label={"Password"}
                        type={"text"}
                        onChange={changeExpert}
                    />
                </div>
                <div className="d-flex justify-content-end">
                    {/* <NavLink to={`/admin/${type}`}> */}
                    <Button1
                        text={"Add"}
                        onClick={addExpert}
                    />
                    {/* </NavLink> */}
                </div>
            </CardLayout >
        </>
    )
}

export default AddExpert