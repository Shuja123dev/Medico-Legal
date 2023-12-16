import React, { useEffect, useState } from 'react'
import { CardLayout } from '../../../user/containers'
import ClientAvatar from "./clientAvatar.png"
import { Button1, H2, H3, InputBox } from '../../../user/components'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'


const EditAdmin = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const AdminId = location.pathname.split("/").pop();

    const [adminDetails, setAdminDetails] = useState({
        PhoneNo: "",
        Email: "",
        UserPassword: "",
        AdminName: "",
        Valid: 1,
        Role: "Admin",
        AdminId
    })

    const getAdminById = async () => {
        await axios.post("http://202.182.110.16/medical/api/login", {
            PhoneNo: "03325501021",
            Password: "abc123"
        }).then(async response => {
            const token = response.data.token;
            await axios.post("http://202.182.110.16/medical/api/getadminbyid", {
                AdminId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                setAdminDetails(res.data.response.data[0])
            }).catch(error => {
                console.log(error);
            })
        })
    }

    const updateAdmin = async () => {
        await axios.post("http://202.182.110.16/medical/api/login", {
            PhoneNo: "03325501021",
            Password: "abc123"
        }).then(async response => {
            const token = response.data.token;
            await axios.post("http://202.182.110.16/medical/api/updateadmin", {
                AdminId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log(res);
                navigate("/admin/admins")
            }).catch(error => {
                console.log(error);
            })
        })
    }

    useEffect(() => {
        getAdminById();
    }, [])


    const handleChange = (event) => {
        const { name, value } = event.target;
        setAdminDetails({
            ...adminDetails,
            [name]: value
        })
    }

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
                                <InputBox type={"text"} placeholder={"Name of the Admin"} value={adminDetails && adminDetails.AdminName} nameIdHtmlFor="AdminName" onChange={handleChange} />
                            </div>
                            <div className="col-md-5 col-sm-12  mb-3">
                                <label className='experts-label support_light_txt mb-2' htmlFor="">ROLE</label>
                                <InputBox value={adminDetails && adminDetails.Role} nameIdHtmlFor="Role" type={"select"} options={[
                                    "Admin", "Super Admin"
                                ]}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row mb-3" style={{ gap: '2rem' }}>
                            <div className="col-md-5 col-sm-12 mb-3">
                                <label className='experts-label support_light_txt mb-2' htmlFor="">PHONE NO</label>
                                <div className="ph-number">+966<InputBox className='expert-input-alter mx-2 col-md-11' nameIdHtmlFor="PhoneNo" type={"text"} value={adminDetails && adminDetails.PhoneNo} onChange={handleChange} /></div>
                            </div>
                            <div className="col-md-5 col-sm-12 mb-3">
                                <label className='experts-label support_light_txt mb-2' htmlFor="">EMAIL</label>
                                <InputBox type={"text"} nameIdHtmlFor={"Email"} value={adminDetails && adminDetails.Email} onChange={handleChange} placeholder={"Email"} />
                            </div>
                        </div>
                        <div className="row mb-3" style={{ gap: '2rem' }}>
                            <div className="col-md-5 col-sm-12 mb-3">
                                <label className='experts-label support_light_txt mb-2' htmlFor="">PASSWORD</label>
                                <InputBox type={"password"} nameIdHtmlFor={"UserPassword"} value={adminDetails && adminDetails.UserPassword} onChange={handleChange} placeholder={"Password"} />
                            </div>
                            <div className="col-md-5 col-sm-12 mb-3 d-flex align-items-end justify-content-end">
                                <Button1 text={"Update"} className='px-4' onClick={updateAdmin} />
                            </div>
                        </div>
                    </div>
                </div>
            </CardLayout>
        </>
    )
}

export default EditAdmin
