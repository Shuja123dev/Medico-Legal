import React, { useState } from "react";
import "./chatLeftSidebar.css";
import { expertImg, xIcon } from "../../assets";
import { ChatLeftbarItemLayout, ChatSearchBar, H3, H4 } from "../../components";

const ChatLeftSidebar = ({
  isLeftSidebarHidden,
  toggleLeftSidebar,
  entries,
  currentEntry,
  setCurrentEntry,
  chatType,
  setShowTicketDetails,
}) => {
  const [searchVal, setSearchVal] = useState("");

  return (
    <>
      <div
        className={`expert_chatLeftSidebar ${
          isLeftSidebarHidden ? "expert_chatLeftSidebar--hidden" : ""
        }`}>
        <button
          onClick={toggleLeftSidebar}
          className="expert_chatLeftSidebar__close_btn">
          <img src={xIcon} alt="x" />
        </button>
        {chatType == "clients-chat" && (
          <>
            <H3 text={"Clients"} />
            <ChatSearchBar setSearchVal={setSearchVal} />
            <div className="expert_chatLeftSidebar__items">
              {entries
                .filter(
                  (entry) =>
                    !searchVal ||
                    entry.name.toLowerCase().includes(searchVal.toLowerCase())
                )
                .map((entry, index) => (
                  <ChatLeftbarItemLayout
                    toggleSidebar={toggleLeftSidebar}
                    value={entry}
                    key={index}
                    currentValue={currentEntry}
                    setCurrentValue={setCurrentEntry}>
                    <div className="d-flex align-items-center ">
                      {chatType === "clients-chat" && (
                        <div>
                          <img src={expertImg} alt="user" />
                        </div>
                      )}
                      <div
                        className={`
                        w-100 ms-2
                        `}>
                        <H4
                          text={entry.name}
                          className={`text-capitalize text-start`}
                        />
                        <div className="d-flex align-items-center justify-content-between m-0 expert_chatLeftSidebar__item__text">
                          <span>{"Last Message"}</span>
                          <span>{entry.lastMessage}</span>
                        </div>
                      </div>
                    </div>
                  </ChatLeftbarItemLayout>
                ))}
            </div>
          </>
        )}
        {(chatType == "cases-chat" || chatType === "tickets") && (
          <>
            <H3 text={chatType === "cases-chat" ? "Cases" : "Tickets"} />
            <ChatSearchBar setSearchVal={setSearchVal} />
            <div className="expert_chatLeftSidebar__items">
              {entries
                .filter(
                  (entry) =>
                    !searchVal ||
                    entry.name.toLowerCase().includes(searchVal.toLowerCase())
                )
                .map((entry, index) => (
                  <ChatLeftbarItemLayout
                    toggleSidebar={toggleLeftSidebar}
                    value={entry}
                    key={index}
                    setShowTicketDetails={setShowTicketDetails}
                    currentValue={currentEntry}
                    setCurrentValue={setCurrentEntry}>
                    <div className="w-100 d-flex flex-column align-items-start">
                      <H4
                        text={
                          chatType === "cases-chat"
                            ? entry.name
                            : `#${entry.name}`
                        }
                        className="text-start text-capitalize "
                      />
                      <p className="expert_chatLeftSidebar__case_p">
                        {chatType === "cases-chat" ? (
                          <>Last Message</>
                        ) : (
                          <>{entry.subject}</>
                        )}
                      </p>
                      <div className="d-flex align-items-center justify-content-between m-0 expert_chatLeftSidebar__item__text expert_chatLeftSidebar__item__text--case">
                        <span>{entry.status}</span>
                        {chatType === "cases-chat" ? (
                          <span>{entry.time}</span>
                        ) : (
                          <>
                            <div>
                              <span>Created: </span>
                              <span>{entry.created}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </ChatLeftbarItemLayout>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatLeftSidebar;
