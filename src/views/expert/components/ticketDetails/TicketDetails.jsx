import React, { useEffect, useState } from "react";
import "./ticketDetails.css";
import { Button1, ExpertDisplay, H3, TicketDetailsTable } from "../";
import Cookies from "js-cookie";
import axios from "axios";

const TicketDetails = ({
  ticketDetails,
  setTicketDetails,
  setShowTicketDetails,
}) => {

  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = Cookies.get('token');

  const [expertId, setExpertId] = useState("0");
  const [experts, setExperts] = useState([])

  const statusChangeHandler = (e) => {
    setTicketDetails((prevEntry) => ({
      ...prevEntry,
      status: e.target.value,
    }));
  };

  const getallexperts = async () => {
    await axios.get(`${baseURL}/api/getallexperts`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(res => {
      console.log(res);
      setExperts(res.data.response.data)
    })
  }

  const addExpertToTicket = async () => {
    expertId !== "0" && await axios.post(`${baseURL}/api/addexperttoticket`, {
      TicketNo: ticketDetails.TicketNo,
      ExpertId: expertId
    }, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(res => {
      console.log(res);
    })
  }

  useEffect(() => {
    getallexperts()
  }, [])

  return (
    <>
      <div className="expert_ticketDetails">
        <div className="expert_ticketDetails__table_div">
          <H3 text={"Ticket Details"} />
          <TicketDetailsTable
            labels={["subject", "description", "status"]}
            values={[
              ticketDetails?.Subject,
              ticketDetails?.Description,
              ticketDetails?.Status,
            ]}
            statusOptions={["New", "Completed", "In Progress"]}
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
          <div className="row my-4">
            <div className="col-md-12 d-flex">
              <select name="" id="" value={expertId} onChange={e => setExpertId(e.target.value)} className='px-2' style={{ width: "70%", marginRight: "1rem" }}>
                <option value="">Expert Name</option>
                {
                  experts.length > 0 && experts.map((expert, index) => {
                    return (
                      <option value={expert.ExpertId}>{expert.ExpertName}</option>
                    )
                  })
                }
              </select>
              <Button1 text={"Add"} onClick={addExpertToTicket} />
            </div>
          </div>
          <div className="expert_ticketDetails__experts_display">
            {ticketDetails && ticketDetails.experts?.map(({ name, areaOfExpertise }, index) => (
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
