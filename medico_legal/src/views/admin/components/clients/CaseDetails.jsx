import React, { useState } from 'react'
import { CardLayout } from '../../../user/containers'
import { Button1, CaseDetailsTable, CasesDisplayTable, ExpertDisplay, H3, H4, InputBox, Pdf } from '../../../user/components'

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

const CaseDetails = () => {

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
                        <div className="user_caseDetails__case_div--edit">

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
                        <div className="user_caseDetails__experts_div__inner">

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
