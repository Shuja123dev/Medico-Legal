import React from "react";
import "./chatRightSidebar.css";
import { plusIcon, xIcon } from "../../assets";
import { Button1, ChatMemberItem, H3, Pdf } from "../../components";

const ChatRightSidebar = ({
  isRightSidebarHidden,
  toggleRightSidebar,
  chatmembers,
  documents,
  toggleDocumentUploadModal,
}) => {
  return (
    <>
      <div
        className={`expert_chatRightSidebar ${
          isRightSidebarHidden ? "expert_chatRightSidebar--hidden" : ""
        }`}>
        <button
          onClick={toggleRightSidebar}
          className="expert_chatRightSidebar__close_btn">
          <img src={xIcon} alt="x" />
        </button>
        <div className="expert_chatRightSidebar__top">
          <H3 text={"Chat Members"} />
          <div className="expert_chatRightSidebar__chatMembers_div">
            {chatmembers.map(({ name, type }, index) => (
              <ChatMemberItem key={index} name={name} type={type} />
            ))}
          </div>
        </div>
        <div className="expert_chatRightSidebar__bottom">
          <H3 text={"Documents"} />
          <div>
            <h5>{"User"}</h5>
            {documents
              .filter((doc) => doc.type === "user")
              .map((doc, index) => (
                <Pdf key={index} name={doc.name} size={doc.size} />
              ))}
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <h5>{"Experts"}</h5>
              <Button1
                icon={plusIcon}
                onClick={() => {
                  toggleDocumentUploadModal();
                  toggleRightSidebar();
                }}
              />
            </div>
            {documents
              .filter((doc) => doc.type === "experts")
              .map((doc, index) => (
                <Pdf key={index} name={doc.name} size={doc.size} />
              ))}
          </div>
          <div>
            <h5>{"Admin"}</h5>
            {documents
              .filter((doc) => doc.type === "admin")
              .map((doc, index) => (
                <Pdf key={index} name={doc.name} size={doc.size} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRightSidebar;
