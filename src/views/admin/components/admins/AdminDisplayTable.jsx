import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { InputBox } from '../../../user/components';
import ConfitmationModal from '../membership/ConfitmationModal';

const AdminDisplayTable = ({ labels, pageCasesToDisplay, path = "/admin/admins/" }) => {

    const [showModal1, setShowModal1] = useState(false)

    const toggleModal1 = () => {
        setShowModal1(!showModal1);
    }

    return (
        <>
            {pageCasesToDisplay?.length !== 0 ? (
                <table className="user_cases_display_table">
                    <thead>
                        <tr className="user_cases_display_table__head">
                            {labels?.map((label, index) => (
                                <th className="user_cases_display_table__label" key={index}>
                                    {label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {pageCasesToDisplay.map((caseItem, index) => (
                            <tr key={index} className="user_cases_display_table__row">
                                {Object.keys(caseItem).map((data, dataIndex) =>
                                    dataIndex === 1 ? (
                                        <td key={dataIndex}>
                                            <Link
                                                className="w-100 d-block user_cases_display_table__cell_link"
                                                to={path + caseItem.id}>
                                                {caseItem[data]}
                                            </Link>
                                        </td>
                                    ) : (
                                        (dataIndex > 3) ? <td className='px-3'>
                                            <InputBox
                                                value={caseItem[data]}
                                                type={"select"}
                                                options={dataIndex === 4 ? [
                                                    "Admin", "Super Admin"
                                                ] : [
                                                    "Active", "Deactive"
                                                ]}
                                            />
                                        </td> :
                                            <td
                                                key={dataIndex}
                                                className="user_cases_display_table__cell">
                                                {caseItem[data]}
                                            </td>
                                    )
                                )}
                                <td className='memberActions '>
                                    <button style={{ color: "rgb(238, 51, 51)" }} onClick={toggleModal1}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center">{t("UserPanel.Cases.NoCasesFound")}</div>
            )}

            {
                showModal1 && <>
                    <ConfitmationModal toggleModal={toggleModal1} modalHead={"Delete Confirmation"}>
                        <div className='flex_box my-3'>
                            <p>Are you sure you want to delete this Admin?</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-end ">
                            <button className="mx-3 user_button1 user_button1--gray " onClick={toggleModal1}>
                                <span>Cancel</span>
                            </button>
                            <button className=" user_button1" style={{ background: "#E33" }} onClick={toggleModal1}>
                                <span>Delete</span>
                            </button>
                        </div>
                    </ConfitmationModal>
                </>

            }
        </>
    )
}

export default AdminDisplayTable
