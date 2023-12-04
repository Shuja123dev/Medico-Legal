import "./cases.css";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button1,
  CasesDisplayTable,
  H2,
  LinkButton1,
  Pagination,
  SearchBar,
} from "../../components";
import { filterIcon, plusIcon } from "../../assets";
import { CardLayout } from "../../containers";

const Cases = ({ cases, role = "user" }) => {
  const statusSelectRef = useRef(null);
  const { t } = useTranslation();
  const [searchVal, setSearchVal] = useState("");
  const [casesToDisplay, setCasesToDisplay] = useState(cases);
  const [pageCasesToDisplay, setPageCasesToDisplay] = useState(cases);
  const [status, setStatus] = useState("All");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filterHandler = () => {
    setStatus(statusSelectRef.current.value);
  };

  useEffect(() => {
    setCasesToDisplay(
      cases.filter(
        (item) =>
          (searchVal === "" ||
            item.caseName.toLowerCase().includes(searchVal.toLowerCase())) &&
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
      <div className="user_cases_outer">
        <div className="d-flex align-items-center justify-content-between ">
          <H2 text={t("UserPanel.Cases.Cases")} />
          <LinkButton1
            text={t("UserPanel.Cases.AddNewCase")}
            icon={plusIcon}
            to={`/${role}/cases/add-new-case`}
          />
        </div>
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-end gap-4">
          <SearchBar setSearchVal={setSearchVal} />
          <div className="user_cases__select_div">
            <span>{t("UserPanel.Cases.Status")}</span>
            <select ref={statusSelectRef}>
              <option>{t("UserPanel.Cases.All")}</option>
              <option>{t("UserPanel.Cases.New")}</option>
              <option>{t("UserPanel.Cases.Opened")}</option>
              <option>{t("UserPanel.Cases.UnderReview")}</option>
              <option>{t("UserPanel.Cases.InProgress")}</option>
              <option>{t("UserPanel.Cases.Closed")}</option>
              <option>{t("UserPanel.Cases.Won")}</option>
              <option>{t("UserPanel.Cases.Lost")}</option>
            </select>
            <Button1
              onClick={filterHandler}
              text={t("UserPanel.Cases.Filter")}
              icon={filterIcon}
            />
          </div>
        </div>
        <CardLayout>
          <div className="user_cases_table_outer">
            <CasesDisplayTable
              path={`/${role}/cases/`}
              labels={[
                t("UserPanel.Cases.Id"),
                t("UserPanel.Cases.Name"),
                t("UserPanel.Cases.Type"),
                t("UserPanel.Cases.Experts"),
                t("UserPanel.Cases.Status"),
              ]}
              pageCasesToDisplay={pageCasesToDisplay}
            />
          </div>
          <div className="cases_display_footer">
            <div className="d-flex gap-4 align-items-center justify-content-center justify-content-md-start">
              <span>{t("UserPanel.Cases.RecordsPerPage")}</span>
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
  );
};

export default Cases;
