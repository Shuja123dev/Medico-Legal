import React from "react";
import "./billingHistoryTable.css";
import { useTranslation } from "react-i18next";

const BillingHistoryTable = ({ labels, pageRecordsToDisplay }) => {
  const { t } = useTranslation();

  return (
    <>
      {pageRecordsToDisplay?.length !== 0 ? (
        <table className="user_billingHistory_table">
          <thead>
            <tr className="user_billingHistory_table__head">
              {labels?.map((label, index) => (
                <th className="user_billingHistory_table__label" key={index}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRecordsToDisplay.map((record, index) => (
              <tr key={index} className="user_billingHistory_table__row">
                {Object.keys(record).map((data, dataIndex) => (
                  <td
                    key={dataIndex}
                    className="user_billingHistory_table__cell">
                    {record[data]}
                  </td>
                ))}
                <td className="user_billingHistory_table__cell">
                  <button>Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">{t("UserPanel.Cases.NoCasesFound")}</div>
      )}
    </>
  );
};

export default BillingHistoryTable;
