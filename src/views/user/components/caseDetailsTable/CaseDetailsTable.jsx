import React from "react";
import "./caseDetailsTable.css";

const CaseDetailsTable = ({ details }) => {

  console.log(details);

  return (
    <>
      <table className="user_caseDetailsTable">
        <tbody>
          <tr>
            <td className="user_user_caseDetailsTable_label">Name</td>
            <td className="user_user_caseDetailsTable_value">
              {details && details.CaseName}
            </td>
          </tr>
          <tr>
            <td className="user_user_caseDetailsTable_label">Type</td>
            <td className="user_user_caseDetailsTable_value">
              {details && details.CaseType}
            </td>
          </tr>
          <tr>
            <td className="user_user_caseDetailsTable_label">Experts</td>
            <td className="user_user_caseDetailsTable_value">
              {/* {details && details.CaseType} */}
              Experts
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CaseDetailsTable;
