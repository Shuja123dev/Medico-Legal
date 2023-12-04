import React from "react";
import "./availablePackageDetailsTable.css";
import { useTranslation } from "react-i18next";
const AvailablePackageDetailsTable = ({ data }) => {
  const { t } = useTranslation();

  return (
    <>
      <table className="user_available_package_details_table">
        <tbody>
          <AvailablePackageDetailsTableRow
            dataKey={t("UserPanel.Packages.Name")}
            dataValue={data["pkgName"]}
          />
          <AvailablePackageDetailsTableRow
            dataKey={t("UserPanel.Packages.Description")}
            dataValue={data["description"]}
          />
          <AvailablePackageDetailsTableRow
            dataKey={t("UserPanel.Packages.Year")}
            dataValue={data["year"]}
          />
          <AvailablePackageDetailsTableRow
            dataKey={t("UserPanel.Packages.Amount")}
            dataValue={`${data["amount"]} SR`}
          />
        </tbody>
      </table>
    </>
  );
};

const AvailablePackageDetailsTableRow = ({ dataKey, dataValue }) => {
  return (
    <>
      <tr>
        <td className="user_available_package_details_table__key py-3 px-3">
          {dataKey}
        </td>
        <td className="user_available_package_details_table__value py-3 px-3">
          {dataValue}
        </td>
      </tr>
    </>
  );
};
export default AvailablePackageDetailsTable;
