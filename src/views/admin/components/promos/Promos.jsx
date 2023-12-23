import { useEffect, useState } from 'react'
import { H2, H3, InputBox, Modal } from '../../../user/components'
import plusIcon from "../management/plusIcon.png"
import bottomArrow from "../management/bottomCheveron.png"
import AdminTable from '../Table/AdminTable'
import axios from 'axios'

const Promos = () => {

    const [showModal1, setShowModal1] = useState(false)
    const [type, setType] = useState("Amount");
    const [promos, setPromos] = useState([]);
    const [promoDetails, setPromoDetails] = useState({
        name: "",
        code: "",
        type: "",
        value: "",
        status: 1,
        amount: "",
        percentage: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPromoDetails({
            ...promoDetails,
            [name]: value,
        })
    }

    useEffect(() => {
        setPromoDetails({
            ...promoDetails,
            type: type
        })
    }, [type])

    const toggleModal1 = () => {
        setShowModal1(!showModal1);
    }

    const getPromos = async () => {
        await axios.post("http://202.182.110.16/medical/api/login", {
            PhoneNo: "03325501021",
            Password: "abc123"
        }).then(async response => {
            const token = response.data.token;
            await axios.get("http://202.182.110.16/medical/api/getallpromo", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                setPromos(res.data.response.data);
            })
        })
    }

    const addPromo = async () => {
        await axios.post("http://202.182.110.16/medical/api/login", {
            PhoneNo: "03325501021",
            Password: "abc123"
        }).then(async response => {
            const token = response.data.token;
            await axios.post("http://202.182.110.16/medical/api/addpromo", {
                PromoName: promoDetails.name,
                Code: promoDetails.code,
                Type: promoDetails.type,
                Percentage: promoDetails.percentage,
                Amount: promoDetails.amount,
                Status: promoDetails.status
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                toggleModal1();
                setPromoDetails({
                    name: "",
                    code: "",
                    type: "",
                    value: "",
                    status: 1,
                    amount: "",
                    percentage: ""
                })
                getPromos()
            })
        })
    }

    useEffect(() => {
        getPromos();
    }, [])

    return (
        <>
            <div className='space_between my-3'>
                <H2 text={
                    <>
                        <span className='text-center'>PROMOS DETAILS</span>
                        <img src={bottomArrow} className='mx-2' />
                    </>
                } />
                <button className='user_link_button1' onClick={toggleModal1}>
                    <img src={plusIcon} alt="" />
                    <span>Add Promo</span>
                </button>
            </div>
            <AdminTable labels={[
                "ID",
                "NAME",
                "CODE",
                "TYPE",
                "PERCENTAGE",
                "AMOUNT",
                "STATUS",
                "ACTIONS"
            ]}
                tableData={promos}
                getPromos={getPromos}
                type="promos"
            />


            {
                showModal1 && <>
                    <Modal toggleModal={toggleModal1} modalHead={"Approval Confirmation"}>
                        <div className="user_createTicketForm mb-3">
                            <H3 text={"ADD PROMO"} />
                            <InputBox type={"text"} placeholder={"Name"} value={promoDetails.name} nameIdHtmlFor={"name"} onChange={handleChange} />
                            <InputBox type={"text"} placeholder={"Code"} value={promoDetails.code} nameIdHtmlFor={"code"} onChange={handleChange} />
                            <div className="row">
                                <div className="col-sm-6" style={{ paddingLeft: "0" }}>
                                    <div className="user_input_box">
                                        <div className="flex_box" style={{ justifyContent: "flex-start" }} onClick={() => { setType("Amount"), handleChange() }}>
                                            <input type="radio" id='amount' name='type' value="Amount" checked={!!(type === "Amount")} />
                                            <label htmlFor="amount">
                                                <h5 className='mx-2'>Amount</h5>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6" style={{ paddingRight: "0" }}>
                                    <div className="user_input_box">
                                        <div className="flex_box" style={{ justifyContent: "flex-start" }} onClick={() => { setType("Percentage"), handleChange() }} >
                                            <input type="radio" id='percent' name='type' value="Percentage" checked={!!(type === "Percentage")} />
                                            <label htmlFor="percent">
                                                <h5 className='mx-2'>Percentage</h5>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <InputBox type={"text"} nameIdHtmlFor={type.toLocaleLowerCase()} value={type === "Amount" ? promoDetails.amount : promoDetails.percentage} placeholder={type} onChange={handleChange} />
                        </div>

                        <div className="d-flex align-items-center justify-content-end ">
                            <button className="mx-3 user_button1 user_button1--gray " onClick={toggleModal1}>
                                <span>Cancel</span>
                            </button>
                            <button className=" user_button1" onClick={addPromo}>
                                <span>Add</span>
                            </button>
                        </div>

                    </Modal>
                </>

            }

        </>
    )
}

export default Promos
