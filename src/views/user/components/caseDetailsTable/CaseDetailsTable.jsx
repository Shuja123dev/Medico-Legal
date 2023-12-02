import React from "react";
import "./caseDetailsTable.css";

const CaseDetailsTable = ({ labels, values }) => {
  return (
    <>
      <table className="user_caseDetailsTable">
        <tbody>
          {labels.map((label, index) => (
            <tr key={index}>
              <td className="user_user_caseDetailsTable_label">{label}</td>
              <td className="user_user_caseDetailsTable_value">
                {values[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CaseDetailsTable;
