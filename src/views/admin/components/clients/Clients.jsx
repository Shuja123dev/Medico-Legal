import React, { useEffect, useRef, useState } from 'react'
import Card from '../Card/Card'
import { Button1, CasesDisplayTable, H2, LinkButton1, Pagination, SearchBar } from '../../../user/components'
import plusIcon from "../management/plusIcon.png"
import filterIcon from "../management/filter.svg"
import { CardLayout } from '../../../user/containers'

const Clients = () => {

    const clients = [
        {
            id: "123",
            name: "Ali Ahmad",
            type: "Doctor, Surgeon",
            contractId: "1234",
            contractName: "Complete Protection",
            cases: 2,
            status: <>
                <select>
                    <option>{"Active"}</option>
                    <option>{"Deactive"}</option>
                </select>
            </>
        },
        {
            id: "123",
            name: "Zaid Ahmad",
            type: "Doctor, Surgeon",
            contractId: "1234",
            contractName: "Complete Protection",
            cases: 2,
            status: <>
                <select>
                    <option>{"Active"}</option>
                    <option>{"Deactive"}</option>
                </select>
            </>
        },
    ]

    const statusSelectRef = useRef(null);
    const [searchVal, setSearchVal] = useState("");
    const [casesToDisplay, setCasesToDisplay] = useState(clients);
    const [pageCasesToDisplay, setPageCasesToDisplay] = useState(clients);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState("All");

    const filterHandler = () => {
        setStatus(statusSelectRef.current.value);
    };

    useEffect(() => {
        setCasesToDisplay(
            clients.filter(
                (item) =>
                (searchVal === "" ||
                    item.name.toLowerCase().includes(searchVal.toLowerCase()))
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
            <div className="row" style={{ gap: '2rem' }}>
                <Card className='col-md-4'>
                    <p>Total Contracts</p>
                    <h1>137</h1>
                </Card>
                <Card className='col-md-4'>
                    <p>Total Contracts</p>
                    <h1>137</h1>
                </Card>
                <Card className='col-md-4'>
                    <p>Total Contracts</p>
                    <h1>137</h1>
                </Card>
                <Card className='col-md-4'>
                    <p>Total Contracts</p>
                    <h1>137</h1>
                </Card>
            </div>
            <div className="user_cases_outer mt-5">
                <div className="d-flex align-items-center justify-content-between ">
                    <H2 text={"CLIENTS"} />
                    <LinkButton1
                        text={"Add new Client"}
                        icon={plusIcon}
                        to={"/user/cases/add-new-case"}
                    />
                </div>
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-end gap-4">
                    <SearchBar setSearchVal={setSearchVal} />
                    <div className="user_cases__select_div">
                        <span>{"Status"}</span>
                        <select ref={statusSelectRef}>
                            <option>{"Active"}</option>
                            <option>{"Deactive"}</option>
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
                            path='/admin/clients/'
                            labels={[
                                "ID",
                                "NAME",
                                "TYPE",
                                "CONTRACT ID",
                                "CONTRACT NAME",
                                "CASES",
                                "STATUS"
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

export default Clients
