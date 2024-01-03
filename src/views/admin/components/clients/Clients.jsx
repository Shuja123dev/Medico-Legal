import React, { useEffect, useRef, useState } from 'react'
import Card from '../Card/Card'
import { Button1, CasesDisplayTable, H2, LinkButton1, Pagination, SearchBar } from '../../../user/components'
import plusIcon from "../management/plusIcon.png"
import filterIcon from "../management/filter.svg"
import { CardLayout } from '../../../user/containers'
import ClientsDisplayTable from './ClientsDisplayTable'
import axios from 'axios'
import Cookies from 'js-cookie'

const Clients = () => {

    const baseURL = import.meta.env.VITE_BASE_URL;
    const token = Cookies.get('token');

    const [clients, setClients] = useState([]);
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

    const getAllClients = async () => {
        await axios.get(baseURL + "/api/getallclient", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            setClients(res.data.response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        getAllClients();
    }, [])

    useEffect(() => {
        setCasesToDisplay(clients)
    }, [clients])

    useEffect(() => {
        setCasesToDisplay(
            clients.filter(
                (item) =>
                    (searchVal === "" ||
                        item.ClientName.toLowerCase().includes(searchVal.toLowerCase())) &&
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
                <div className="p-2 col-md-3">
                    <Card >
                        <p>Total Clients</p>
                        <h1>203</h1>
                    </Card>
                </div>
                <div className="p-2 col-md-3">
                    <Card >
                        <p>Surgeon Doctors</p>
                        <h1>45</h1>
                    </Card>
                </div>
                <div className="p-2 col-md-3">
                    <Card >
                        <p>Non - Surgeon Doctors</p>
                        <h1>120</h1>
                    </Card>
                </div>
                <div className="p-2 col-md-3">
                    <Card >
                        <p>Medical Professional</p>
                        <h1>38</h1>
                    </Card>
                </div>
            </div>
            <div className="user_cases_outer mt-5">
                <div className="d-flex align-items-center justify-content-between ">
                    <H2 text={"CLIENTS"} />
                    <LinkButton1
                        text={"Add new Client"}
                        icon={plusIcon}
                        to={"/admin/clients/add-client"}
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
                        <ClientsDisplayTable
                            path='/admin/clients/'
                            labels={[
                                "ID",
                                "NAME",
                                "ExistingCase",
                                "User ID",
                                "Valid",
                                "Phone No.",
                                "PackageId",
                                "Type",
                                "Speciality",
                                "Experience"
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
