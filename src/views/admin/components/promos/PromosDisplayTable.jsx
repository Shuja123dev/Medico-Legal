import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { H3, InputBox, Modal } from '../../../user/components';
import axios from 'axios';

const PromosDisplayTable = ({ labels, pageCasesToDisplay, path = "/admin/promos/", getPromos }) => {

    const { t } = useTranslation();

    const [showModal1, setShowModal1] = useState(false)
    const [type, setType] = useState("Amount");
    const [promo, setPromo] = useState({
        PromoId: "",
        PromoName: "",
        Code: "",
        Type: "",
        Percentage: "",
        Amount: "",
        Status: 1
    });

    const toggleModal1 = (data) => {
        setShowModal1(!showModal1);
        data && setType(data.Type)
        data && setPromo(data)
    }

    const updatePromo = async () => {
        await axios.post("http://202.182.110.16/medical/api/login", {
            PhoneNo: "03325501021",
            Password: "abc123"
        }).then(async response => {
            const token = response.data.token;
            await axios.post("http://202.182.110.16/medical/api/updatepromo", {
                ...promo,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log(res);
                toggleModal1();
                getPromos();
            })
        })
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPromo({
            ...promo,
            [name]: value,
        })
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
                                            {/* <Link
                                                className="w-100 d-block user_cases_display_table__cell_link"
                                                to={path + caseItem.PromoId}> */}
                                            {caseItem[data]}
                                            {/* </Link> */}
                                        </td>
                                    ) : (
                                        (dataIndex < 6) ? <td
                                            key={dataIndex}
                                            className="user_cases_display_table__cell">
                                            {caseItem[data]}
                                        </td> : <td>
                                            <InputBox
                                                type={"select"}
                                                value={caseItem[data] === 1 ? "Active" : "Deactive"}
                                                options={[
                                                    "Active",
                                                    "Deactive"
                                                ]}
                                            />
                                        </td>
                                    )
                                )}
                                <td key={index} className="user_cases_display_table__cell memberActions">
                                    <button style={{ color: "#3573C9" }} onClick={() => toggleModal1(caseItem)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center">{t("No Record Found")}</div>
            )}


            {
                showModal1 && <>
                    <Modal toggleModal={toggleModal1} modalHead={"Approval Confirmation"}>
                        <div className="user_createTicketForm mb-3">
                            <H3 text={"UPDATE PROMO"} />
                            <InputBox type={"text"} placeholder={"Name"} value={promo.PromoName && promo.PromoName} nameIdHtmlFor={"PromoName"} onChange={handleChange} />
                            <InputBox type={"text"} placeholder={"Code"} value={promo.Code && promo.Code} nameIdHtmlFor={"Code"} onChange={handleChange} />
                            <div className="row">
                                <div className="col-sm-6" style={{ paddingLeft: "0" }}>
                                    <div className="user_input_box">
                                        <div className="flex_box" style={{ justifyContent: "flex-start" }} onClick={() => setType("Amount")}>
                                            <input type="radio" id='amount' name='Amount' value="Type" checked={!!(type === "Amount")} onChange={handleChange} />
                                            <label htmlFor="amount">
                                                <h5 className='mx-2'>Amount</h5>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6" style={{ paddingRight: "0" }}>
                                    <div className="user_input_box">
                                        <div className="flex_box" style={{ justifyContent: "flex-start" }} onClick={() => setType("Percentage")}>
                                            <input type="radio" id='percent' name='type' value="Percentage" checked={!!(type === "Percentage")} />
                                            <label htmlFor="percent">
                                                <h5 className='mx-2'>Percentage</h5>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <InputBox type={"text"} nameIdHtmlFor={type} placeholder={type} value={type === "Percentage" ? promo.Percentage : promo.Amount} onChange={handleChange} />
                        </div>

                        <div className="d-flex align-items-center justify-content-end ">
                            <button className="mx-3 user_button1 user_button1--gray " onClick={toggleModal1}>
                                <span>Cancel</span>
                            </button>
                            <button className=" user_button1" onClick={updatePromo}>
                                <span>Update</span>
                            </button>
                        </div>

                    </Modal>
                </>
            }


        </>
    )
}

export default PromosDisplayTable
