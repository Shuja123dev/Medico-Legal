import React, { useState } from 'react'
import { CardLayout } from '../../../user/containers'
import { Button1, CaseDetailsTable, CasesDisplayTable, ExpertDisplay, H3, H4, InputBox, Pdf } from '../../../user/components'
import { NavLink } from 'react-router-dom';
import deleteIcon from "../support/deleteIcon.svg"

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

const CaseDetails = ({ role = null }) => {

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

    const [editStatus, setEditStatus] = useState(false);


    return (
        <>
            <CardLayout className="user_caseDetails__card p-md-5 ">
                <div className="user_caseDetails__left">
                    <div className="user_caseDetails__cases_div">
                        <div className="user_caseDetails__cases_div__header">
                            <H4 text={"Case"} />
                            {!editStatus && (
                                <Button1
                                    onClick={() => setEditStatus(true)}
                                    text={"EditRequest"}
                                />
                            )}
                        </div>
                        <div className="row my-4 mb-5">
                            <div className="col-md-12 d-flex my-2">
                                <H4 text={"NAME"} className='support_light_txt' />
                                <p>Name of the case</p>
                            </div>
                            <div className="col-md-12 d-flex my-2">
                                <H4 text={"TYPE"} className='support_light_txt' />
                                <p>Public Court</p>
                            </div>
                            <div className="col-md-12 d-flex my-2">
                                <H4 text={"STATUS"} className='support_light_txt' />
                                <select>
                                    <option value="">Active</option>
                                    <option value="">Completed</option>
                                    <option value="">Progress</option>
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
                                role === "admin" ? "admin"
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
                                <select name="" id="" className='px-2' style={{ width: "70%", marginRight: "1rem" }}>
                                    <option value="">Expert Name</option>
                                </select>
                                <Button1 text={"Add"} />
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
