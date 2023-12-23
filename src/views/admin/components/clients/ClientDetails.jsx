import React, { useEffect, useState } from 'react'
import { H2 } from '../../../user/components'
import { CardLayout } from '../../../user/containers'
import clientAvatar from "./clientAvatar.png"
import MembrshipDetails from './MembrshipDetails'
import ContactInfo from './ContactInfo'
import ClientCases from './ClientCases'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const ClientDetails = () => {

    const location = useLocation();
    const [clientInfo, setClientData] = useState();
    const [clientCases, setClientCases] = useState();

    const buttonsTxt = [
        "Membership",
        "Contact Information",
        "Cases"
    ]

    const clientId = location.pathname.split('/').pop();
    const getClientbyId = async () => {
        await axios.post("http://202.182.110.16/medical/api/login", {
            PhoneNo: "03325501021",
            Password: "abc123"
        }).then(async response => {
            const token = response.data.token;
            await axios.post("http://202.182.110.16/medical/api/getclientbyid", {
                ClientId: clientId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            ).then(res => {
                setClientData(res.data.response.data)
            }).catch(error => {
                console.log(error);
            })
        })
    }

    const getCasesOfCLient = async () => {
        await axios.post("http://202.182.110.16/medical/api/login", {
            PhoneNo: "03325501021",
            Password: "abc123"
        }).then(async response => {
            const token = response.data.token;
            await axios.post("http://202.182.110.16/medical/api/getcasebyclient", {
                ClientId: clientId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            ).then(res => {
                setClientCases(res.data.response.data)
            }).catch(error => {
                console.log(error);
            })
        })
    }

    useEffect(() => {
        getClientbyId();
        getCasesOfCLient();
    }, [])

    console.log(clientCases);


    const [content, setContent] = useState(<MembrshipDetails />)
    const [activeInx, setActiveIndx] = useState(0);

    const showContent = (index) => {
        setActiveIndx(index);
        if (index === 0)
            setContent(<MembrshipDetails />)
        else if (index === 1)
            setContent(<ContactInfo phNo={clientInfo && clientInfo[0].PhoneNo} email="example@gmail.com" />)
        else
            setContent(<ClientCases cases={clientCases} />)
    }

    return (
        <>
            <H2 text={"CLIENT"} className='mb-4' />
            <CardLayout className='mb-5'>
                <div className="row">
                    <div className="col-md-1">
                        <img className='clntAvtar' src={clientAvatar} alt="" />
                    </div>
                    <div className="col-md-11">
                        <div className="flex_box px-3" style={{ justifyContent: "space-between" }}>
                            <div>
                                <h5>{clientInfo ? clientInfo[0].ClientName : "Name"}</h5>
                                <p className='blurTxt font-weight-bold'>{clientInfo ? clientInfo[0].Type : "Type"}</p>
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
                        <p>{clientInfo && clientInfo[0].Speciality}</p>
                    </div>
                    <div id="mid-line" className='col-md-1 mx-5'></div>
                    <div className="col-md-3" style={{ marginLeft: "2rem" }}>
                        <p className='blurTxt headingBlur'>YEAR OF EXPERIENCE</p>
                        <p>{clientInfo && clientInfo[0].Experience}</p>
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
                    {content}
                </div>
            </div>
        </>
    )
}

export default ClientDetails
