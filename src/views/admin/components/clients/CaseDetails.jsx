import React, { useEffect, useState } from 'react'
import { CardLayout } from '../../../user/containers'
import { Button1, CaseDetailsTable, CasesDisplayTable, ExpertDisplay, H3, H4, InputBox, Pdf } from '../../../user/components'
import deleteIcon from "../support/deleteIcon.svg"
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const CaseDetails = ({ role = null, type = "cases" }) => {

    const location = useLocation();

    const userId = type === "cases" ? location.pathname.split("/").pop() : location.pathname.split("/")[3];

    const [caseDetails, setCaseDetails] = useState();
    const [editStatus, setEditStatus] = useState(false);
    const [experts, setExperts] = useState([]);
    const [expName, setExpName] = useState("1");
    const [expertsAdded, setExpertsAdded] = useState([]);

    const addExpert = () => {
        expName !== "1" && setExpertsAdded([
            ...expertsAdded,
            {
                ExpertName: expName,
                Expertise: "Medical Wakeel"
            }
        ])
    };

    const getCaseById = async () => {
        await axios.post("http://202.182.110.16/medical/api/login", {
            PhoneNo: "03325501021",
            Password: "abc123"
        }).then(async response => {
            const token = response.data.token;
            await axios.post("http://202.182.110.16/medical/api/getcasebyid", {
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
        })
    }

    const addExpertToCase = async () => {
        addExpert()
        await axios.post("http://202.182.110.16/medical/api/login", {
            PhoneNo: "03325501021",
            Password: "abc123"
        }).then(async response => {
            const token = response.data.token;
            await axios.post("http://202.182.110.16/medical/api/addexperttocase", {
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
        })
    }

    const removeExpertFromCase = async () => {
        await axios.post("http://202.182.110.16/medical/api/login", {
            PhoneNo: "03325501021",
            Password: "abc123"
        }).then(async response => {
            const token = response.data.token;
            await axios.post("http://202.182.110.16/medical/api/removexpertfromcase", {
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
        })
    }

    const getAllExperts = async () => {
        await axios.post("http://202.182.110.16/medical/api/login", {
            PhoneNo: "03325501021",
            Password: "abc123"
        }).then(async response => {
            const token = response.data.token;
            await axios.get("http://202.182.110.16/medical/api/getallexperts", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log(res);
                setExperts(res.data.response.data)
            })
        })
    }

    useEffect(() => {
        getCaseById();
        getAllExperts()
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

    const handleChangeExpert = (event) => {
        setExpName(event.target.value);
    }




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
                                <select value={expName} name="" id="" className='px-2' style={{ width: "70%", marginRight: "1rem" }} onChange={handleChangeExpert}>
                                    <option value="1">Expert Names</option>
                                    {experts.length > 0 &&
                                        experts.map((exp) => {
                                            return <option value={exp.ExpertName}>{exp.ExpertName}</option>
                                        })
                                    }
                                </select>
                                <Button1 text={"Add"} onClick={addExpertToCase} />
                            </div>
                        </div>
                        <div className="row expert_cards_box">
                            {
                                expertsAdded.length > 0 && expertsAdded.map((exp) => {
                                    return <div className="col-lg-6 col-md-12 my-3">
                                        <CardLayout className='p-4'>
                                            <div className="row">
                                                <div className="col-md-10">
                                                    <H4 text={exp.ExpertName} />
                                                    <p>{exp.Expertise}</p>
                                                </div>
                                                <div className="col-md-2 d-flex text-center align-items-center">
                                                    <img src={deleteIcon} alt="" onClick={removeExpertFromCase} />
                                                </div>
                                            </div>
                                        </CardLayout>
                                    </div>
                                })
                            }
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
