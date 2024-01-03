import React, { useEffect, useState } from 'react'
import { CardLayout } from '../../../user/containers'
import { Button1, CaseDetailsTable, CasesDisplayTable, ExpertDisplay, H3, H4, InputBox, Pdf } from '../../../user/components'
import deleteIcon from "../support/deleteIcon.svg"
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const experts = [
    {
        expertName: "Dr. John Doe",
        areaOfExpertise: "Forensic Pathology",
    },

    {
        expertName: "Dr. Jane Smith",
        areaOfExpertise: "Criminal Psychology",
    },

    {
        expertName: "Dr. Mark Johnson",
        areaOfExpertise: "Digital Forensics",
    },

    {
        expertName: "Dr. Emily Davis",
        areaOfExpertise: "Forensic Anthropology",
    },
];

const CaseDetails = ({ role = null, type = "cases" }) => {

    const location = useLocation();
    const baseURL = import.meta.env.VITE_BASE_URL;
    const token = Cookies.get('token');

    const userId = type === "cases" ? location.pathname.split("/").pop() : location.pathname.split("/")[3];

    const [clients, setClients] = useState([])
    const [experts, setExperts] = useState([])
    const [caseDetails, setCaseDetails] = useState();
    const [editStatus, setEditStatus] = useState(false);
    const [expertId, setExpertId] = useState("0");

    const getClients = async () => {
        await axios.get(baseURL + "/api/getallclient", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res);
            setClients(res.data.response.data)
        })
    }


    const getExperts = async () => {
        await axios.get(baseURL + "/api/getallexperts", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res);
            setExperts(res.data.response.data)
        })
    }

    const getCaseById = async () => {
        await axios.post(baseURL + "/api/getcasebyid", {
            CaseId: userId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            setCaseDetails(res.data.response.data[0])
        }).catch(error => {
            console.log(error);
        })
    }

    const addExpertToCase = async () => {
        expertId !== "0" && await axios.post(baseURL + "/api/addexperttocase", {
            CaseId: userId,
            ExpertId: expertId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res);
        }).catch(error => {
            console.log(error);
        })
    }

    console.log(experts);

    const removeExpertFromCase = async () => {
        await axios.post(baseURL + "/api/removexpertfromcase", {
            CaseId: userId,
            ExpertId: 1
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            // console.log(res);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        getCaseById();
        getClients();
        getExperts();
    }, [])

    const modalData = {
        expertRemoval: {
            title: "RemovalRequest",
            message: "RemovalRequestMsg",
        },
        documentDeletion: {
            title: "DeleteConfirmation",
            message: "DeleteConfirmationMsg",
        },
    };

    const [currModalDataState, setCurrModalDataState] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible((prevState) => !prevState);
    };

    const caseUpdateHandler = (e) => {

    };

    const deleteClickHandler = (state) => {
        setCurrModalDataState(state);
        toggleModal();
    };

    console.log(experts);


    return (
        <>
            <CardLayout className="user_caseDetails__card p-md-5 ">
                <div className="user_caseDetails__left">
                    <div className="user_caseDetails__cases_div">
                        <div className="user_caseDetails__cases_div__header">
                            <H4 text={"Case"} />
                            {(!editStatus && !role === "admin") && (
                                <Button1
                                    onClick={() => setEditStatus(true)}
                                    text={"EditRequest"}
                                />
                            )}
                        </div>
                        <div className="row my-4 mb-5">
                            <div className="col-md-12 d-flex my-2">
                                <H4 text={"NAME"} className='support_light_txt' />
                                <p>{caseDetails && caseDetails.CaseName}</p>
                            </div>
                            <div className="col-md-12 d-flex my-2">
                                <H4 text={"TYPE"} className='support_light_txt' />
                                <p>{caseDetails && caseDetails.CaseType}</p>
                            </div>
                            <div className="col-md-12 d-flex my-2">
                                <H4 text={"STATUS"} className='support_light_txt' />
                                <select value={caseDetails && caseDetails.Status}>
                                    <option value="Active">Active</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Progress">Progress</option>
                                    <option value="Opennn">Open</option>
                                    <option value="New">New</option>
                                </select>
                            </div>
                        </div>
                        {editStatus && (
                            <div className="w-100 d-flex justify-content-end my-5">
                                <Button1
                                    onClick={() => setEditStatus(false)}
                                    text={"Update"}
                                />
                            </div>
                        )}
                    </div>
                    <div className="user_caseDetails__experts_div">
                        <H4 text={"Client"} />
                        <div className="row my-4 mb-5">
                            {
                                role === "admin" ? <>
                                    <div className="row my-4">
                                        <div className="col-md-12 d-flex">
                                            <select name="" id="" className='px-2' style={{ width: "70%", marginRight: "1rem" }}>
                                                <option value="">Client Name</option>
                                                {
                                                    clients.length > 0 && clients.map((client, index) => {
                                                        return (
                                                            <option value={client.ClientId}>{client.ClientName}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <Button1 text={"Add"} />
                                        </div>
                                    </div>
                                </>
                                    :
                                    <>
                                        <div className="col-md-12 d-flex my-2">
                                            <H4 text={"NAME"} className='support_light_txt' />
                                            <p>Name of the client</p>
                                        </div>
                                        <div className="col-md-12 d-flex my-2">
                                            <H4 text={"TYPE"} className='support_light_txt' />
                                            <p>Type of the client</p>
                                        </div>
                                        <div className="col-md-12 d-flex my-2">
                                            <H4 text={"SPECIALITY"} className='support_light_txt' />
                                            <p>Gastroentrology</p>
                                        </div>
                                        <div className="col-md-12 d-flex my-2">
                                            <H4 text={"EXPERIENCE"} className='support_light_txt' />
                                            <p>4 years</p>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                    <div className="user_caseDetails__experts_div">
                        {editStatus && (
                            <div className="mb-5">
                                <H4
                                    text={"AddExpert"}
                                    className="mb-4"
                                />
                                <Button1
                                    text={"AddRequest"}
                                />
                            </div>
                        )}
                        <H4 text={"Experts"} />
                        <div className="row my-4">
                            <div className="col-md-12 d-flex">
                                <select name="" id="" value={expertId} onChange={e => setExpertId(e.target.value)} className='px-2' style={{ width: "70%", marginRight: "1rem" }}>
                                    <option value="0">Expert Name</option>
                                    {
                                        experts.length > 0 && experts.map((expert, index) => {
                                            return (
                                                <option value={expert.ExpertId}>{expert.ExpertName}</option>
                                            )
                                        })
                                    }
                                </select>
                                <Button1 text={"Add"} onClick={addExpertToCase} />
                            </div>
                        </div>
                        <div className="row expert_cards_box">
                            <div className="col-lg-6 col-md-12 my-3">
                                <CardLayout className='p-4'>
                                    <div className="row">
                                        <div className="col-md-10">
                                            <H4 text={"Name of the Expert"} />
                                            <p>Area of experties</p>
                                        </div>
                                        <div className="col-md-2 d-flex text-center align-items-center">
                                            <img src={deleteIcon} alt="" onClick={removeExpertFromCase} />
                                        </div>
                                    </div>
                                </CardLayout>
                            </div>
                            <div className="col-lg-6 col-md-12 my-3">
                                <CardLayout className='p-4'>
                                    <div className="row">
                                        <div className="col-md-10">
                                            <H4 text={"Name of the Expert"} />
                                            <p>Area of experties</p>
                                        </div>
                                        <div className="col-md-2 d-flex text-center align-items-center">
                                            <img src={deleteIcon} alt="" />
                                        </div>
                                    </div>
                                </CardLayout>
                            </div>
                            <div className="col-lg-6 col-md-12 my-3">
                                <CardLayout className='p-4'>
                                    <div className="row">
                                        <div className="col-md-10">
                                            <H4 text={"Name of the Expert"} />
                                            <p>Area of experties</p>
                                        </div>
                                        <div className="col-md-2 d-flex text-center align-items-center">
                                            <img src={deleteIcon} alt="" />
                                        </div>
                                    </div>
                                </CardLayout>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user_caseDetails__right">
                    <H3
                        text={"Documents"}
                        className="text-xl-center "
                    />
                    <div>
                        <h5>{"Experts"}</h5>
                        <Pdf
                            name={"Name of the document"}
                            size={"120kb"}
                            editStatus={editStatus}
                            onDeleteClick={() => deleteClickHandler("documentDeletion")}
                        />
                        <Pdf
                            name={"Name of the document"}
                            size={"120kb"}
                            editStatus={editStatus}
                            onDeleteClick={() => deleteClickHandler("documentDeletion")}
                        />
                    </div>
                    <div>
                        <h5>{"User"}</h5>
                        <Pdf
                            name={"Name of the document"}
                            size={"120kb"}
                            editStatus={editStatus}
                            onDeleteClick={() => deleteClickHandler("documentDeletion")}
                        />
                        <Pdf
                            name={"Name of the document"}
                            size={"120kb"}
                            editStatus={editStatus}
                            onDeleteClick={() => deleteClickHandler("documentDeletion")}
                        />
                    </div>
                </div>
            </CardLayout>
        </>
    )
}

export default CaseDetails
