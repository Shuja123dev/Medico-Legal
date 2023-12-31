import React, { useEffect, useRef, useState } from "react";
import "./chatMain.css";
import {
  Button1,
  CreateTicketForm,
  H3,
  Modal,
  UploadModal,
} from "../../components";
import {
  messagesIcon,
  sendIcon,
  userGroupIcon,
  userImg,
} from "../../assets";
import ChatMessagesBox from "../chatMessagesBox/ChatMessagesBox";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { TicketDetails } from "../../../expert/components";
import Cookies from "js-cookie";

const ChatMain = ({
  toggleLeftSidebar,
  toggleRightSidebar,
  messagesToDisplay,
  setMessages,
  currentEntry,
  showTicketDetails,
  setCurrentEntry,
  setShowTicketDetails,
  chatType,
  // Ticket
  ticketInputHandler,
  newTicket,
  createTicketModal,
  toggleTicketModal,
  documentUploadModal,
  toggleDocumentUploadModal,
  getMessages
}) => {
  const { t } = useTranslation();
  const location = useLocation().pathname.split('/')[2];
  const textareaRef = useRef();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = Cookies.get('token');


  const [newMessage, setNewMessage] = useState("");



  const sendMessageToTicket = async () => {
    await axios.post(baseURL + "/api/addmessagetoticket", {
      TicketNo: currentEntry.TicketNo,
      MemberId: 1,
      MemberType: "Client",
      Message: newMessage,
      MessageTime: "2024-12-03 13:13:13",
      // MessageTime: newMessage.time,
      DocumentId: 0
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      console.log(res);
      getMessages()
    }).catch(error => {
      console.log(error);
    })
  };

  const sendMessageHandler = () => {
    if (newMessage.trim() == "") return;
    setNewMessage("");
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: newMessage,
        time: "12:00",
        isMine: true,
        sender: null,
        sentTo: currentEntry.name,
      },
    ]);
    textareaRef.current.rows = 1;

    if (location == "support") {
      sendMessageToTicket()
    }

  };


  const adjustTextareaRows = () => {
    const textarea = textareaRef.current;
    textarea && (textarea.style.height = "auto")
    textarea && (textarea.style.height = `${textarea.scrollHeight}px`);
  };

  useEffect(() => {
    adjustTextareaRows();
  }, [newMessage]);

  const textareaInputHandler = (e) => {
    const lines = e.target.value.split(/\r?\n/).length;
    textareaRef.current.rows = lines;
    setNewMessage(e.target.value);
    if (e.target.value == "") {
      textareaRef.current.rows = 1;
    }
  };



  const textareaKeyUpHandler = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      sendMessageHandler();
    }
  };

  return (
    <>
      <div className="user_chatMain">
        <div className="user_chatMain__header">
          {chatType !== "admin-chat" && (
            <button
              onClick={toggleLeftSidebar}
              className="user_chatMain__bars_btn">
              <img src={messagesIcon} alt="bars left" />
              <img src={messagesIcon} alt="bars left" />
            </button>
          )}
          <div className="user_chatMain__header__left">
            {chatType === "experts-chat" && (
              <img src={userImg} alt="Abdullah" />
            )}
            <H3
              text={
                chatType === "admin-chat"
                  ? t("UserPanel.Chat.Admin")
                  : chatType === "support"
                    ? `#${currentEntry && currentEntry[Object.keys(currentEntry)[0]]}`
                    : currentEntry && "#" + currentEntry[Object.keys(currentEntry)[0]]
              }
              className="m-0 text-capitalize "
            />
          </div>
          <button
            onClick={toggleRightSidebar}
            className="user_chatMain__bars_btn">
            <img src={userGroupIcon} alt="bars right" />
            <img src={userGroupIcon} alt="bars right" />
          </button>
        </div>
        {(showTicketDetails && chatType === "support") ?

          <TicketDetails
            ticketDetails={currentEntry}
            setTicketDetails={setCurrentEntry}
            setShowTicketDetails={setShowTicketDetails}
          />
          :
          <>
            <ChatMessagesBox messages={messagesToDisplay} />
            <div className="user_chatMain__input_div">
              <textarea
                ref={textareaRef}
                type="text"
                rows="1"
                value={newMessage}
                placeholder={t("UserPanel.Chat.TypeAMessage")}
                onInput={textareaInputHandler}
                onKeyDown={(e) => {
                  textareaKeyUpHandler(e);
                }}></textarea>
              <button onClick={sendMessageHandler} className="p-0">
                <img src={sendIcon} alt="send" />
              </button>
            </div>
          </>}
        {createTicketModal && (
          <Modal toggleModal={toggleTicketModal}>
            <CreateTicketForm
              newTicket={newTicket}
              ticketInputHandler={ticketInputHandler}
            />
            <div className="d-flex align-items-center justify-content-end mt-5 ">
              <Button1
                onClick={toggleTicketModal}
                text={t("UserPanel.Cases.AddNewCasePage.Cancel")}
                color="gray"
                className="mx-3"
              />
              <Button1
                onClick={toggleTicketModal}
                text={t("UserPanel.Cases.AddNewCasePage.Submit")}
              />
            </div>
          </Modal>
        )}
        {documentUploadModal && (
          <Modal toggleModal={toggleDocumentUploadModal}>
            <UploadModal
              modalType={"documentUpload"}
              toggleModal={toggleDocumentUploadModal}
            />
            <div className="d-flex align-items-center justify-content-between mt-4 ">
              <Button1
                onClick={toggleDocumentUploadModal}
                text={t("UserPanel.Cases.AddNewCasePage.Cancel")}
                color="gray"
              />
              <Button1
                onClick={toggleDocumentUploadModal}
                text={t("UserPanel.Cases.AddNewCasePage.Submit")}
              />
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default ChatMain;
