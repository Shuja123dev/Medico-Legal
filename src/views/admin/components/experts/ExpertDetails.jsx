import React, { useEffect, useState } from 'react'
import { H2 } from '../../../user/components'
import { CardLayout } from '../../../user/containers'
import clientAvatar from "./clientAvatar.png"
import ContactInfo from '../clients/ContactInfo'
import ClientCases from '../clients/ClientCases'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

const ExpertDetails = () => {
    const buttonsTxt = [
        "Contact Information",
        "Cases"
    ]

    const baseURL = import.meta.env.VITE_BASE_URL;
    const token = Cookies.get('token');

    const expertId = useLocation().pathname.split("/")[3]

    const [activeInx, setActiveIndx] = useState(0);
    const [expertDetails, setExpertDetails] = useState()

    const showContent = (index) => {
        setActiveIndx(index);
    }

    const getExpertDetails = async () => {
        await axios.post(baseURL + "/api/getexpertbyid", {
            ExpertId: expertId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res);
            setExpertDetails(res.data.response.data[0])
        })

    }

    useEffect(() => {
        getExpertDetails()
    }, [])





    return (
        <>
            <H2 text={"EXPERT"} className='mb-4' />
            <CardLayout className='mb-5'>
                <div className="row">
                    <div className="col-md-1">
                        <img className='clntAvtar' src={clientAvatar} alt="" />
                    </div>
                    <div className="col-md-11">
                        <div className="flex_box px-3" style={{ justifyContent: "space-between" }}>
                            <div>
                                <h5>{expertDetails && expertDetails.ExpertName}</h5>
                                <p className='blurTxt font-weight-bold'>Surgeon, Doctor</p>
                            </div>
                            <select name="" id="">
                                <option value="">Active</option>
                                <option value="">Deactive</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-2">
                        <p className='blurTxt headingBlur'>SPECIALITY</p>
                        <p>{expertDetails && expertDetails.Expertise}</p>
                    </div>
                    <div id="mid-line" className='col-md-1 mx-5'></div>
                    <div className="col-md-3" style={{ marginLeft: "2rem" }}>
                        <p className='blurTxt headingBlur'>YEAR OF EXPERIENCE</p>
                        <p>{expertDetails && expertDetails.Experience}</p>
                    </div>
                </div>
            </CardLayout>

            <div className="row mt-3">
                <div className="col-md-3 buttonsBox">
                    {
                        buttonsTxt.map((text, index) => {
                            return (
                                <button className={`user_sidebar__link ${(activeInx === index) ? "user_sidebar__link--active" : "bg-white"}`} onClick={() => showContent(index)}>
                                    {text}
                                </button>
                            )
                        })
                    }
                </div>
                <div className="col-md-9">
                    {(activeInx === 0) ? <ContactInfo phNo={expertDetails && expertDetails.PhoneNo} email={expertDetails && expertDetails.Email} adress={expertDetails && expertDetails.Address} /> : <ClientCases />}
                </div>
            </div>
        </>
    )
}

export default ExpertDetails
