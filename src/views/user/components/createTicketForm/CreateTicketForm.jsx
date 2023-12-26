import React, { useState } from "react";
import "./createTicketForm.css";
import InputBox from "../inputBox/InputBox";
import Button1 from "../button1/Button1";
import Dropzone from "../dropzone/Dropzone";
import H3 from "../h3/H3";
import { useTranslation } from "react-i18next";
import Pdf from "../pdf/Pdf";

const CreateTicketForm = ({
  newTicket = {},
  ticketInputHandler,
}) => {
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);
  return (
    <>
      <div className="user_createTicketForm">
        <H3 text={"Create a Ticket"} className="text-center" />
        <InputBox
          type={"text"}
          label={t("UserPanel.Chat.Subject")}
          nameIdHtmlFor={"subject"}
          value={newTicket.subject}
          onChange={ticketInputHandler}
        />
        <InputBox
          type={"textarea"}
          label={t("UserPanel.Chat.Description")}
          nameIdHtmlFor={"description"}
          value={newTicket.description}
          onChange={ticketInputHandler}
        />
        <InputBox
          type={"select"}
          label={t("UserPanel.Chat.Status")}
          nameIdHtmlFor={"status"}
          options={[t("UserPanel.Chat.New")]}
          value={newTicket.status}
          onChange={ticketInputHandler}
        />
        <div>
          <h5 className="user_createTicketForm__h5">
            {t("UserPanel.Chat.Document")}
          </h5>
          <Dropzone
            content={t("UserPanel.Packages.ClickToUploadDocument")}
            files={files}
            setFiles={setFiles}
            className="my-2"
          />
          {
            files.length > 0 && files.map((file) => {
              return <Pdf key={file.name} name={file.name} size={file.size} />
            })
          }
          <Button1 text={t("UserPanel.Chat.Upload")} />
        </div>
      </div>
    </>
  );
};

export default CreateTicketForm;
