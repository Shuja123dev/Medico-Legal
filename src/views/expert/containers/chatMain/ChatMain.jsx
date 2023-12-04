import React, { useEffect, useRef, useState } from "react";
import "./chatMain.css";
import {
  H3,
  ChatMessagesBox,
  TicketDetails,
  UploadModal,
  Modal,
  Button1,
} from "../../components";
import { barsLeftIcon, barsRightIcon, sendIcon, expertImg } from "../../assets";

const ChatMain = ({
  toggleLeftSidebar,
  toggleRightSidebar,
  messagesToDisplay,
  setMessages,
  currentEntry,
  setCurrentEntry,
  chatType,
  showTicketDetails,
  setShowTicketDetails,
  toggleDocumentUploadModal,
  documentUploadModal,
}) => {
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
      <div className="expert_chatMain">
        {chatType === "tickets" && showTicketDetails ? (
          <TicketDetails
            ticketDetails={currentEntry}
            setTicketDetails={setCurrentEntry}
            setShowTicketDetails={setShowTicketDetails}
          />
        ) : (
          <>
            <div className="expert_chatMain__header">
              {chatType !== "admin-chat" && (
                <button
                  onClick={toggleLeftSidebar}
                  className="expert_chatMain__bars_btn">
                  <img src={barsLeftIcon} alt="bars left" />
                </button>
              )}
              <div className="expert_chatMain__header__left">
                {chatType === "clients-chat" && (
                  <img src={expertImg} alt="Abdullah" />
                )}
                <H3
                  text={
                    chatType === "admin-chat"
                      ? "Admin"
                      : chatType === "tickets"
                      ? `#${currentEntry.name}`
                      : currentEntry?.name
                  }
                  className="m-0 text-capitalize "
                />
              </div>
              <button
                onClick={toggleRightSidebar}
                className="expert_chatMain__bars_btn">
                <img src={barsRightIcon} alt="bars right" />
              </button>
            </div>
            <ChatMessagesBox messages={messagesToDisplay} />
            <div className="expert_chatMain__input_div">
              <textarea
                ref={textareaRef}
                type="text"
                rows="1"
                value={newMessage}
                placeholder={"Type a message..."}
                onInput={textareaInputHandler}
                onKeyDown={(e) => {
                  textareaKeyUpHandler(e);
                }}></textarea>
              <button onClick={sendMessageHandler} className="p-0">
                <img src={sendIcon} alt="send" />
              </button>
            </div>
          </>
        )}
        {documentUploadModal && (
          <Modal toggleModal={toggleDocumentUploadModal}>
            <UploadModal />
            <div className="d-flex align-items-center justify-content-between mt-4 ">
              <Button1
                onClick={toggleDocumentUploadModal}
                text={"Cancel"}
                color="gray"
              />
              <Button1 onClick={toggleDocumentUploadModal} text={"Submit"} />
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default ChatMain;
