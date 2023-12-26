import "./packageDetails.css";
import React, { useState } from "react";
import { CardLayout } from "../../containers";
import {
  AvailablePackageDetailsTable,
  Button1,
  CreateTicketForm,
  H2,
  H3,
  Modal,
} from "../../components";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const PackageDetails = ({ availablePackages }) => {
  const { t } = useTranslation();
  const location = useLocation().pathname.split("/")[3];
  const [currentAvailablePackage, setCurrentAvailablePackage] = useState(
    availablePackages && availablePackages.find(({ packageId }) => packageId == location)
  );

  const baseURL = import.meta.env.VITE_BASE_URL;
  const userId = Cookies.get("userId")

  // Ticket
  const [newTicket, setNewTicket] = useState({
    subject: currentAvailablePackage && currentAvailablePackage.PackageName,
    description: currentAvailablePackage && currentAvailablePackage.Description,
    status: "New",
  });

  const ticketInputHandler = (e) => {
    setNewTicket((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const createTicketHandler = async () => {
    await axios.post(baseURL + "/api/login", {
      PhoneNo: "03325501021",
      Password: "abc123"
    }).then(async response => {
      const token = response.data.token;
      await axios.post(baseURL + "/api/addticket", {
        Subject: newTicket.subject,
        Description: newTicket.description,
        ClientId: userId,
        Status: newTicket.status,
        CreationDate: "2023-12-01 13:13:13"
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        if (res.data.response.data.status) {
          toggleTicketModal()
        }
      })
    })
  };

  const [createTicketModal, setCreateTicketModal] = useState(false);
  const toggleTicketModal = () => {
    setCreateTicketModal((prevState) => !prevState);
  };

  return (
    <>
      <div className="user_packageDetails_outer">
        <H2 text={t("UserPanel.Packages.PackageDetails")} />
        <CardLayout>
          <H3 text={t("UserPanel.Packages.PackageDetails")} />
          <div className="user_packageDetails_table_outer">
            <AvailablePackageDetailsTable data={currentAvailablePackage} />
          </div>
          <Button1
            text={t("UserPanel.Packages.ContactUs")}
            onClick={toggleTicketModal}
            className="mt-4"
          />
        </CardLayout>
      </div>
      {createTicketModal && (
        <Modal toggleModal={toggleTicketModal}>
          <CreateTicketForm
            newTicket={newTicket}
            ticketInputHandler={ticketInputHandler}
          />
          <div className="d-flex align-items-center justify-content-end mt-2 ">
            <Button1
              onClick={toggleTicketModal}
              text={t("UserPanel.Cases.AddNewCasePage.Cancel")}
              color="gray"
              className="mx-3"
            />
            <Button1
              onClick={createTicketHandler}
              text={t("UserPanel.Cases.AddNewCasePage.Submit")}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default PackageDetails;
