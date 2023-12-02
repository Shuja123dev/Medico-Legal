import React, { useEffect, useRef, useState } from 'react'
import Card from '../Card/Card'
import { Button1, CasesDisplayTable, H2, H3, InputBox, LinkButton1, Modal, Pagination, SearchBar } from '../../../user/components'
import bottomArrow from "./bottomCheveron.png"
import ManagementTable from './ManagementTable'
import plusIcon from "./plusIcon.png"
import filterIcon from "./filter.svg"
import { CardLayout } from '../../../user/containers'

const Management = () => {

    const [showModal1, setShowModal1] = useState(false)

    const toggleModal1 = () => {
        setShowModal1(!showModal1);
    }

    const memberships = [
        {
            id: "123",
            name: "Complete Protection",
            description: "Lorem ipsum dolor sit amet....",
            year: "2",
            amount: "500",
            discount: "30%",
        },
    ]

    const clientsMemberships = [
        {
            clientID: "123",
            clientName: "Ali Ahmad",
            clientType: "Doctor, Surgeon",
            contractID: "1234",
            contractName: "Complete Protection",
            contractYear: "2",
            amount: "5000",
            date: "10/22/2023"
        },
        {
            clientID: "123",
            clientName: "Raza Ahmad",
            clientType: "Doctor, Surgeon",
            contractID: "1234",
            contractName: "Complete Protection",
            contractYear: "2",
            amount: "5000",
            date: "10/22/2023"
        },
    ];

    const statusSelectRef = useRef(null);
    const [searchVal, setSearchVal] = useState("");
    const [casesToDisplay, setCasesToDisplay] = useState(clientsMemberships);
    const [pageCasesToDisplay, setPageCasesToDisplay] = useState(clientsMemberships);
    const [status, setStatus] = useState("All");
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filterHandler = () => {
        setStatus(statusSelectRef.current.value);
    };

    useEffect(() => {
        setCasesToDisplay(
            clientsMemberships.filter(
                (item) =>
                    (searchVal === "" ||
                        item.clientName.toLowerCase().includes(searchVal.toLowerCase())) &&
                    (status.toLowerCase() === "all" ||
                        item.status.toLowerCase() === status.toLowerCase())
            )
        );
    }, [searchVal, status]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * recordsPerPage;
        const endIndex = startIndex + recordsPerPage;

        setPageCasesToDisplay(casesToDisplay.slice(startIndex, endIndex));
    }, [casesToDisplay, currentPage, recordsPerPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [recordsPerPage]);

    return (
        <>
            <div className="cards_box mb-5">
                <Card>
                    <p>Total Memberships</p>
                    <h1>137</h1>
                </Card>
                <Card>
                    <p>Revenue</p>
                    <div className='cardContent'>
                        <h3 className="text-secondary fw-bold  h3_comp" style={{ marginBottom: '12px' }}>SR</h3>
                        <h1>1.2 M</h1>
                    </div>
                </Card>
            </div>
            <div className='space_between mb-3'>
                <H2 text={
                    <>
                        <span className='text-center'>MEMBERSHIPS</span>
                        <img src={bottomArrow} className='mx-2' />
                    </>
                } />
                <button className='user_link_button1' onClick={toggleModal1}>
                    <img src={plusIcon} alt="" />
                    <span>Create Membership</span>
                </button>
            </div>
            <ManagementTable tableData={memberships} />

            {
                showModal1 && <>
                    <Modal toggleModal={toggleModal1} modalHead={"Approval Confirmation"}>
                        <div className="user_createTicketForm">
                            <H3 text={"CREATE MEMBERSHIP"} />
                            <InputBox type={"text"} placeholder={"Name"} />
                            <InputBox type={"textarea"} placeholder={"Description"} />
                            <InputBox type={"date"} placeholder={"Year"} />
                            <div className="row">
                                <div className="col-sm-6" style={{ paddingLeft: "0" }}>
                                    <InputBox type={"text"} placeholder={"Amount"} />
                                </div>
                                <div className="col-sm-6" style={{ paddingRight: "0" }}>
                                    <InputBox type={"text"} placeholder={"Discount (%)"} />
                                </div>
                            </div>
                            <InputBox type={"select"} placeholder={"Discount (%)"} options={["Type"]} />
                            <div className="user_input_box">
                                <div className="flex_box" style={{ justifyContent: "flex-start" }}>
                                    <input type="radio" id='promo' />
                                    <h5 className='mx-2'>Promo</h5>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex align-items-center justify-content-end ">
                            <button className="mx-3 user_button1 user_button1--gray " onClick={toggleModal1}>
                                <span>Cancel</span>
                            </button>
                            <button className=" user_button1" onClick={toggleModal1}>
                                <span>Submit</span>
                            </button>
                        </div>
                    </Modal>

                </>

            }
            {/* table 2 */}

            <div className="user_cases_outer mt-5">
                <div className="d-flex align-items-center justify-content-between ">
                    <H2 text={<>
                        <span className='text-center'>MEMBERSHIPS PURCHASED BY CLIENTS</span>
                        <img src={bottomArrow} className='mx-2' />
                    </>} />
                </div>
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-end gap-4">
                    <SearchBar setSearchVal={setSearchVal} />
                    <div className="user_cases__select_div">
                        <span>{"Year"}</span>
                        <select ref={statusSelectRef}>
                            <option>{"2023"}</option>
                            <option>{"2022"}</option>
                        </select>
                        <span>{"Client Type"}</span>
                        <select ref={statusSelectRef}>
                            <option>{"Doctor"}</option>
                            <option>{"Sergon"}</option>
                        </select>
                        <Button1
                            onClick={filterHandler}
                            text={"Filter"}
                            icon={filterIcon}
                        />
                    </div>
                </div>
                <CardLayout>
                    <div className="user_cases_table_outer">
                        <CasesDisplayTable
                            labels={[
                                "CLIENT ID",
                                "CLIENT NAME",
                                "CLIENT TYPE",
                                "CONTRACT ID",
                                "CONTRACT NAME",
                                "CONTRACT YEAR",
                                "AMOUNT",
                                "DATE",
                            ]}
                            pageCasesToDisplay={pageCasesToDisplay}
                        />
                    </div>
                    <div className="cases_display_footer">
                        <div className="d-flex gap-4 align-items-center justify-content-center justify-content-md-start">
                            <span>{"RecordsPerPage"}</span>
                            <select
                                value={recordsPerPage}
                                onChange={(e) => setRecordsPerPage(Number(e.target.value))}>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                                <option value={40}>40</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                        <Pagination
                            recordsToDisplay={casesToDisplay}
                            recordsPerPage={recordsPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </CardLayout>
            </div>

        </>
    )
}

export default Management
