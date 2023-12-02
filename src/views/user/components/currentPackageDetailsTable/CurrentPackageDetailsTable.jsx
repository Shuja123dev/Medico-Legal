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
            dataValue={data["pkgName"]}
          />
          <CurrentPackageDetailsTableRow
            dataKey={t("UserPanel.Packages.Description")}
            dataValue={data["description"]}
          />
          <CurrentPackageDetailsTableRow
            dataKey={t("UserPanel.Packages.Year")}
            dataValue={data["year"]}
          />
          <CurrentPackageDetailsTableRow
            dataKey={t("UserPanel.Packages.Amount")}
            dataValue={`${data["amount"]} SR`}
          />
          <CurrentPackageDetailsTableRow
            dataKey={t("UserPanel.Packages.DateOfContract")}
            dataValue={data["dateOfContract"]}
          />
          <CurrentPackageDetailsTableRow
            dataKey={t("UserPanel.Packages.TimeRemaining")}
            dataValue={`${data["timeRemaining"]} days`}
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
        <td className="user_current_package_details_table__key py-3 px-3">
          {dataKey}
        </td>
        <td className="current_package_details_table__value py-3 px-3">
          {dataValue}
        </td>
      </tr>
    </>
  );
};

export default CurrentPackageDetailsTable;
