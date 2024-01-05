import React from "react";
import "./ticketDetailsTable.css";

const TicketDetailsTable = ({
  labels,
  values,
  statusOptions,
  onStatusChange,
}) => {
  return (
    <>
      <table className="expert_ticketDetailsTable">
        <tbody>
          {labels.map((label, index) => (
            <tr key={index}>
              <td className="expert_ticketDetailsTable_label">{label}</td>
              <td className="expert_ticketDetailsTable_value">
                {label == "status" ? (
                  <select
                    className="expert_ticketDetailsTable_statusSelect"
                    value={values[index] === "1" ? "Completed" : "In Progress"}
                    onChange={onStatusChange}>
                    {statusOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <>{values[index]}</>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TicketDetailsTable;
