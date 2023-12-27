import React from "react";
import "./currentPackageDetailsTable.css";
import { useTranslation } from "react-i18next";

const CurrentPackageDetailsTable = ({ data }) => {
  const { t } = useTranslation();

  return (
    <>
      <table className="user_current_package_details_table">
        <tbody>
          <CurrentPackageDetailsTableRow
            dataKey={t("UserPanel.Packages.Name")}
            dataValue={data && data[0]["PackageName"]}
          />
          <CurrentPackageDetailsTableRow
            dataKey={t("UserPanel.Packages.Description")}
            dataValue={data && data[0]["Description"]}
          />
          <CurrentPackageDetailsTableRow
            dataKey={t("UserPanel.Packages.Year")}
            dataValue={data && data[0]["Valid"]}
          />
          <CurrentPackageDetailsTableRow
            dataKey={t("UserPanel.Packages.Amount")}
            dataValue={`${data && data[0]["Fee"]} SR`}
          />
          <CurrentPackageDetailsTableRow
            dataKey={t("UserPanel.Packages.DateOfContract")}
            dataValue={data && data[0]["dateOfContract"]}
          />
          <CurrentPackageDetailsTableRow
            dataKey={t("UserPanel.Packages.TimeRemaining")}
            dataValue={`${data && data[0]["timeRemaining"]} days`}
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
