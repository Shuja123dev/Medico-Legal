import { useEffect, useState } from 'react'
import { H2, H3, InputBox, Modal } from '../../../user/components'
import plusIcon from "../management/plusIcon.png"
import bottomArrow from "../management/bottomCheveron.png"
import AdminTable from '../Table/AdminTable'
import axios from 'axios'

const Promos = () => {

    const [showModal1, setShowModal1] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [type, setType] = useState("Amount");
    const [promos, setPromos] = useState([]);

    const toggleModal1 = () => {
        setShowModal1(!showModal1);
    }
    const toggleModal2 = () => {
        setShowModal2(!showModal2);
    }

    const getPromos = async () => {
        await axios.post("http://202.182.110.16/medical/api/login", {
            PhoneNo: "03325501021",
            Password: "abc123"
        }).then(async response => {
            const token = response.data.token;
            await axios.get("http://202.182.110.16/medical/api/getallmembers", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                setPromos(res.data.response.data);
            })
        })
    }

    useEffect(() => {
        getPromos();
    }, [])

    const clientsMemberships = [
        {
            clientID: "123",
            clientName: "Raza Ahmad",
            clientType: "Doctor, Surgeon",
            contractID: "1234",
            contractName: "Complete Protection",
            contractYear: "2",
            amount: "5000",
            date: "10/22/2023",
            buttons: <>
                <div className="memberActions">
                    <button style={{ color: "#3573C9" }} onClick={toggleModal2}>Edit</button>
                    <button style={{ color: "#EE3333" }} >Delete</button>
                </div>
            </>
        },
    ];
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
                type="promos"
            />


            {
                showModal1 && <>
                    <Modal toggleModal={toggleModal1} modalHead={"Approval Confirmation"}>
                        <div className="user_createTicketForm mb-3">
                            <H3 text={"ADD PROMO"} />
                            <InputBox type={"text"} placeholder={"Name"} />
                            <InputBox type={"text"} placeholder={"Code"} />
                            <div className="row">
                                <div className="col-sm-6" style={{ paddingLeft: "0" }}>
                                    <div className="user_input_box">
                                        <div className="flex_box" style={{ justifyContent: "flex-start" }} onClick={() => setType("Amount")}>
                                            <input type="radio" id='amount' name='type' value="Amount" checked={!!(type === "Amount")} />
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
                            <InputBox type={"text"} placeholder={type} />
                        </div>

                        <div className="d-flex align-items-center justify-content-end ">
                            <button className="mx-3 user_button1 user_button1--gray " onClick={toggleModal1}>
                                <span>Cancel</span>
                            </button>
                            <button className=" user_button1" onClick={toggleModal1}>
                                <span>Add</span>
                            </button>
                        </div>

                    </Modal>
                </>

            }

            {
                showModal2 && <>
                    <Modal toggleModal={toggleModal2} modalHead={"Approval Confirmation"}>
                        <div className="user_createTicketForm mb-3">
                            <H3 text={"UPDATE PROMO"} />
                            <InputBox type={"text"} placeholder={"Name"} />
                            <InputBox type={"text"} placeholder={"Code"} />
                            <div className="row">
                                <div className="col-sm-6" style={{ paddingLeft: "0" }}>
                                    <div className="user_input_box">
                                        <div className="flex_box" style={{ justifyContent: "flex-start" }} onClick={() => setType("Amount")}>
                                            <input type="radio" id='amount' name='type' value="Amount" checked={!!(type === "Amount")} />
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
                            <InputBox type={"text"} placeholder={type} />
                        </div>

                        <div className="d-flex align-items-center justify-content-end ">
                            <button className="mx-3 user_button1 user_button1--gray " onClick={toggleModal2}>
                                <span>Cancel</span>
                            </button>
                            <button className=" user_button1" onClick={toggleModal2}>
                                <span>Update</span>
                            </button>
                        </div>

                    </Modal>
                </>
            }


        </>
    )
}

export default Promos
