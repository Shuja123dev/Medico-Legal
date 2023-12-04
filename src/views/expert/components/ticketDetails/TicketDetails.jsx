import React from "react";
import "./ticketDetails.css";
import { Button1, ExpertDisplay, H3, TicketDetailsTable } from "../";

const TicketDetails = ({
  ticketDetails,
  setTicketDetails,
  setShowTicketDetails,
}) => {
  const statusChangeHandler = (e) => {
    setTicketDetails((prevEntry) => ({
      ...prevEntry,
      status: e.target.value,
    }));
  };

  return (
    <>
      <div className="expert_ticketDetails">
        <div className="expert_ticketDetails__table_div">
          <H3 text={"Ticket Details"} />
          <TicketDetailsTable
            labels={["subject", "description", "status"]}
            values={[
              ticketDetails?.subject,
              ticketDetails?.description,
              ticketDetails?.status,
            ]}
            statusOptions={["open", "closed"]}
            onStatusChange={statusChangeHandler}
          />
          <Button1
            text={"Respond"}
            className="px-5"
            onClick={() => {
              setShowTicketDetails(false);
            }}
          />
        </div>
        <div>
          <H3 text={"Experts"} className="mb-4" />
          <div className="expert_ticketDetails__experts_display">
            {ticketDetails.experts?.map(({ name, areaOfExpertise }, index) => (
              <ExpertDisplay
                key={index}
                expertName={name}
                areaOfExpertise={areaOfExpertise}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketDetails;
