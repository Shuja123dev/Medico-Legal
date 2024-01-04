import React from "react";
import "./currentPackageDetailsTable.css";
import { useTranslation } from "react-i18next";
import { DateFormatForUser } from "../../../../components/custom/DateFormatForServer";

const CurrentPackageDetailsTable = ({ data }) => {
  const { t } = useTranslation();

  // write a function to find no of days between two dates  fromat ("Fri Jan 05 2024 00:32:37 GMT+0500 (Pakistan Standard Time)")
  const daysRemaining = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const differenceInDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    return differenceInDays;
  }




  return (
    <>
      <table className="user_current_package_details_table">
        <tbody>
          <CurrentPackageDetailsTableRow
            dataKey={t("UserPanel.Packages.Name")}
            dataValue={data && data[0]["Contract Name"]}
          />
          {/* <CurrentPackageDetailsTableRow
            dataKey={t("UserPanel.Packages.Description")}
            dataValue={data && data[0]["Description"]}
          /> */}
          <CurrentPackageDetailsTableRow
            dataKey={t("UserPanel.Packages.Year")}
            dataValue={data && data[0]["Year"]}
          />
          <CurrentPackageDetailsTableRow
            dataKey={t("UserPanel.Packages.Amount")}
            dataValue={`${data && data[0]["Fee"]} SR`}
          />
          <CurrentPackageDetailsTableRow
            dataKey={t("UserPanel.Packages.DateOfContract")}
            dataValue={data && DateFormatForUser(data[0]["ContractDate"])}
          />
          <CurrentPackageDetailsTableRow
            dataKey={t("UserPanel.Packages.TimeRemaining")}
            dataValue={`${data && daysRemaining(Date(data[0]["ExpiryDate"]), Date())} days`}
          />
        </tbody>
      </table>
    </>
  );
};

const CurrentPackageDetailsTableRow = ({ dataKey, dataValue }) => {
  return (
    <>
      <tr>
        <td className="user_current_package_details_table__key py-3 px-2 px-sm-3">
          {dataKey}
        </td>
        <td className="current_package_details_table__value py-3 px-2 px-sm-3">
          {dataValue}
        </td>
      </tr>
    </>
  );
};

export default CurrentPackageDetailsTable;
