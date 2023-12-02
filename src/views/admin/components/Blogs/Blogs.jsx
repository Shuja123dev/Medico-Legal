import React, { useEffect, useRef, useState } from 'react'
import { Button1, CasesDisplayTable, H2, LinkButton1, Pagination, SearchBar } from '../../../user/components'
import { CardLayout } from '../../../user/containers';
import { plusIcon, filterIcon } from '../../../user/assets';
import BlogDisplayTable from './BlogDisplayTable';
import blogImg1 from "./blogImg1.png"

const blogs = [
    {
        id: "123",
        image: blogImg1,
        title: "My Blog",
        status: "Published",
    },
    {
        id: "456",
        image: blogImg1,
        title: "His Blog",
        status: "Draft",
    },
]
const Blogs = () => {

    const statusSelectRef = useRef(null);
    const [searchVal, setSearchVal] = useState("");
    const [casesToDisplay, setCasesToDisplay] = useState(blogs);
    const [pageCasesToDisplay, setPageCasesToDisplay] = useState(blogs);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState("All");

    const filterHandler = () => {
        setStatus(statusSelectRef.current.value);
    };

    useEffect(() => {
        setCasesToDisplay(
            blogs.filter(
                (item) =>
                    (searchVal === "" ||
                        item.title.toLowerCase().includes(searchVal.toLowerCase())) &&
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
            <div className="d-flex align-items-center justify-content-between mb-4">
                <H2 text={"CLIENTS"} />
                <LinkButton1
                    text={"Blog"}
                    icon={plusIcon}
                    to={"/admin/blogs/add-new-blog"}
                />
            </div>
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-end gap-4 mb-3">
                <SearchBar setSearchVal={setSearchVal} />
                <div className="user_cases__select_div">
                    <span>{"Status"}</span>
                    <select ref={statusSelectRef}>
                        <option>{"All"}</option>
                        <option>{"Published"}</option>
                        <option>{"Draft"}</option>
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
                    <BlogDisplayTable
                        path='/admin/blogs/'
                        labels={[
                            "ID",
                            "IMAGE",
                            "TITLE",
                            "STATUS",
                            "ACTIONS"
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
        </>
    )
}

export default Blogs
