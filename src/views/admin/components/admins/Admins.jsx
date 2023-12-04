import React, { useEffect, useRef, useState } from 'react'
import Card from '../Card/Card'
import { CardLayout } from '../../../user/containers'
import { Button1, H2, LinkButton1, Pagination, SearchBar } from '../../../user/components'
import plusIcon from "../management/plusIcon.png"
import filterIcon from "../management/filter.svg"
import AdminDisplayTable from './AdminDisplayTable'

const Admins = () => {

    const admins = [
        {
            id: "123",
            name: "Ali Ahmed",
            phNo: "12345678",
            password: "asdfg",
            role: "Admin",
            status: "Active"
        },
        {
            id: "456",
            name: "Raza Ahmed",
            phNo: "12345678",
            password: "asdfg",
            role: "Admin",
            status: "Deactive"
        },
    ]

    const statusSelectRef = useRef(null);
    const [searchVal, setSearchVal] = useState("");
    const [casesToDisplay, setCasesToDisplay] = useState(admins);
    const [pageCasesToDisplay, setPageCasesToDisplay] = useState(admins);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState("All");

    const filterHandler = () => {
        setStatus(statusSelectRef.current.value);
    };

    useEffect(() => {
        setCasesToDisplay(
            admins.filter(
                (item) =>
                    (searchVal === "" ||
                        item.name.toLowerCase().includes(searchVal.toLowerCase())) &&
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
            <div className="row p-2">
                <div className="p-3 col-md-3">
                    <Card >
                        <p>Total Admins</p>
                        <h1>203</h1>
                    </Card>
                </div>
                <div className="p-3 col-md-3">
                    <Card >
                        <p>Active admins</p>
                        <h1>45</h1>
                    </Card>
                </div>
                <div className="p-3 col-md-3">
                    <Card >
                        <p>Inactive admins</p>
                        <h1>120</h1>
                    </Card>
                </div>
            </div>
            <div className="user_cases_outer mt-5">
                <div className="d-flex align-items-center justify-content-between ">
                    <H2 text={"ADMINS"} />
                    <LinkButton1
                        text={"Add new Admin"}
                        icon={plusIcon}
                        to={"/admin/admins/add-admin"}
                    />
                </div>
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-end gap-4">
                    <SearchBar setSearchVal={setSearchVal} />
                    <div className="user_cases__select_div">
                        <span>{"Status"}</span>
                        <select ref={statusSelectRef}>
                            <option>{"All"}</option>
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
                        <AdminDisplayTable
                            labels={[
                                "ID",
                                "NAME",
                                "PHONE NO",
                                "PASSWORD",
                                "ROLE",
                                "STATUS",
                                "ACTION"
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

export default Admins
