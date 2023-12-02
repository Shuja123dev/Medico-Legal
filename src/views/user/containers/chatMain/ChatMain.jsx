import React, { useEffect, useRef, useState } from "react";
import "./chatMain.css";
import { Button1, CreateTicketForm, H3, Modal } from "../../components";
import { barsLeftIcon, barsRightIcon, sendIcon, userImg } from "../../assets";
import ChatMessagesBox from "../chatMessagesBox/ChatMessagesBox";
import { useTranslation } from "react-i18next";

const ChatMain = ({
  toggleLeftSidebar,
  toggleRightSidebar,
  messagesToDisplay,
  setMessages,
  currentEntry,
  chatType,
  // Ticket
  ticketInputHandler,
  newTicket,
  createTicketModal,
  toggleTicketModal,
}) => {
  const { t } = useTranslation();
  const textareaRef = useRef();
  const [newMessage, setNewMessage] = useState("");

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
  };

  useEffect(() => {
    adjustTextareaRows();
  }, [newMessage]);

  const adjustTextareaRows = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

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
              <img src={barsLeftIcon} alt="bars left" />
            </button>
          )}
          <div className="user_chatMain__header__left">
            {chatType === "experts-chat" && (
              <img src={userImg} alt="Abdullah" />
            )}
            {chatType === "clients-chat" && (
              <img src={userImg} alt="Abdullah" />
            )}
            <H3
              text={
                chatType === "admin-chat"
                  ? t("UserPanel.Chat.Admin")
                  : chatType === "support"
                    ? `#${currentEntry.name}`
                    : currentEntry?.name
              }
              className="m-0 text-capitalize "
            />
          </div>
          <button
            onClick={toggleRightSidebar}
            className="user_chatMain__bars_btn">
            <img src={barsRightIcon} alt="bars right" />
          </button>
        </div>
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
      </div>
    </>
  );
};

export default ChatMain;
