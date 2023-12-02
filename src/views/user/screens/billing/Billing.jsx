import React, { useEffect, useState } from "react";
import "./billing.css";
import { BillingHistoryTable, H2, Pagination } from "../../components";
import { useTranslation } from "react-i18next";
import { BillingChannel, CardLayout } from "../../containers";

const billingHistory = [
  {
    contract_id: 123,
    name: "Name of the case",
    type: "Public Court",
    year: 2,
    date: "12/10/2023",
    amount: 2850,
    payment_method: "Mada card",
  },
];

const Billing = () => {
  const { t } = useTranslation();
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsToDisplay, setRecordsToDisplay] = useState(billingHistory);
  const [pageRecordsToDisplay, setPageRecordsToDisplay] =
    useState(billingHistory);

  useEffect(() => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;

    setPageRecordsToDisplay(recordsToDisplay.slice(startIndex, endIndex));
  }, [recordsToDisplay, currentPage, recordsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [recordsPerPage]);

  return (
    <>
      <div className="user_billing">
        <H2 text={t("UserPanel.Billing.CurrentBillingChannel")} />
        <CardLayout>
          <BillingChannel />
        </CardLayout>
        <H2 text={t("UserPanel.Billing.BillingHistory")} />
        <CardLayout>
          <div className="user_billingHistory__table_outer">
            <BillingHistoryTable
              pageRecordsToDisplay={pageRecordsToDisplay}
              labels={[
                t("UserPanel.Billing.ContractId"),
                t("UserPanel.Billing.Name"),
                t("UserPanel.Billing.Type"),
                t("UserPanel.Billing.Year"),
                t("UserPanel.Billing.Date"),
                t("UserPanel.Billing.Amount"),
                t("UserPanel.Billing.PaymentMethod"),
                t("UserPanel.Billing.Invoice"),
              ]}
            />
          </div>
          <div className="user_billing__footer">
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
              recordsToDisplay={recordsToDisplay}
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

export default Billing;
