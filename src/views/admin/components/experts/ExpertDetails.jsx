import React, { useState } from 'react'
import { H2 } from '../../../user/components'
import { CardLayout } from '../../../user/containers'
import clientAvatar from "./clientAvatar.png"
import ContactInfo from '../clients/ContactInfo'
import ClientCases from '../clients/ClientCases'

const ExpertDetails = () => {
    const buttonsTxt = [
        "Contact Information",
        "Cases"
    ]

    const [activeInx, setActiveIndx] = useState(0);

    const showContent = (index) => {
        setActiveIndx(index);
    }

    const casesData = [
        {
            name: "Name",
            description: "Public and Insurance Court",
            status: "Status"
        },
        {
            name: "Name",
            description: "Public and Insurance Court",
            status: "Status"
        },
        {
            name: "Name",
            description: "Public and Insurance Court",
            status: "Status"
        },
    ]

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
                                <h5>Name</h5>
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
                        <p>Gastroentrology</p>
                    </div>
                    <div id="mid-line" className='col-md-1 mx-5'></div>
                    <div className="col-md-3" style={{ marginLeft: "2rem" }}>
                        <p className='blurTxt headingBlur'>YEAR OF EXPERIENCE</p>
                        <p>10</p>
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
                    {(activeInx === 0) ? <ContactInfo phNo={"+966 14847 9797"} email="example@gmail.com" /> : <ClientCases cases={casesData} />}
                </div>
            </div>
        </>
    )
}

export default ExpertDetails