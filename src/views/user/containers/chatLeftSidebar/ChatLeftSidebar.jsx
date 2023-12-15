import React, { useState } from "react";
import "./chatLeftSidebar.css";
import { plusIcon, userImg, xIcon } from "../../assets";
import {
  Button1,
  ChatLeftbarItemLayout,
  ChatSearchBar,
  H3,
  H4,
} from "../../components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ChatLeftSidebar = ({
  isLeftSidebarHidden,
  toggleLeftSidebar,
  entries,
  currentEntry,
  setCurrentEntry,
  chatType,
  toggleTicketModal,
  type = ""
}) => {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.value);
  const [searchVal, setSearchVal] = useState("");

  const formatDate = (inputDateString) => {
    const inputDate = new Date(inputDateString);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return inputDate.toLocaleDateString('en-GB', options);
  }

  return (
    <>
      <div
        className={`user_chatLeftSidebar ${isLeftSidebarHidden ? "user_chatLeftSidebar--hidden" : ""
          } ${lang === "ar" ? "user_chatLeftSidebar_ar" : ""} ${type === "support" ? "ticketMax" : ""}`}>
        <button
          onClick={toggleLeftSidebar}
          className="user_chatLeftSidebar__close_btn">
          <img src={xIcon} alt="x" />
        </button>
        {(chatType == "experts-chat") && (
          <>
            {chatType === "experts-chat" ? (
              <H3 text={t("UserPanel.Chat.Experts")} />
            ) : (
              <div className="d-flex align-items-center justify-content-between">
                <H3 text={t("UserPanel.Chat.Tickets")} />
                <Button1
                  icon={plusIcon}
                  className="p-2 rounded-5"
                  onClick={() => {
                    toggleTicketModal();
                    toggleLeftSidebar();
                  }}
                />
              </div>
            )}
            <ChatSearchBar setSearchVal={setSearchVal} />
            <div className="user_chatLeftSidebar__items">
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
                      {chatType === "experts-chat" && (
                        <div>
                          <img src={userImg} alt="user" />
                        </div>
                      )}
                      <div
                        className={`
                        w-100 ${lang === "ar" ? "me-2" : "ms-2"}
                        `}>
                        <H4
                          text={
                            chatType === "experts-chat"
                              ? entry.name
                              : `#${entry.name}`
                          }
                          className={`text-capitalize
                          ${lang === "ar" ? "text-end " : "text-start "}
                          `}
                        />
                        <div className="d-flex align-items-center justify-content-between m-0 user_chatLeftSidebar__item__text">
                          <span>{t("UserPanel.Chat.LastMessage")}</span>
                          <span>{entry.lastMessage}</span>
                        </div>
                      </div>
                    </div>
                  </ChatLeftbarItemLayout>
                ))}
            </div>
          </>
        )}
        {chatType == "cases-chat" && (
          <>
            <H3 text={t("UserPanel.Chat.Cases")} />
            <ChatSearchBar setSearchVal={setSearchVal} />
            <div className="user_chatLeftSidebar__items">
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
                    <div className="w-100 d-flex flex-column align-items-start">
                      <H4
                        text={entry.name}
                        className="text-start text-capitalize "
                      />
                      <p className="user_chatLeftSidebar__case_p">
                        {t("UserPanel.Chat.LastMessage")}
                      </p>
                      <div className="d-flex align-items-center justify-content-between m-0 user_chatLeftSidebar__item__text user_chatLeftSidebar__item__text--case">
                        <span>{entry.status}</span>
                        <span>12:00</span>
                      </div>
                    </div>
                  </ChatLeftbarItemLayout>
                ))}
            </div>
          </>
        )}

        {chatType == "support" && (
          <>
            <H3 text={t("UserPanel.Chat.Tickets")} className="mb-3 fw-700" />
            <div className="user_chatLeftSidebar__items">
              {entries.map((entry, index) => (
                <ChatLeftbarItemLayout
                  toggleSidebar={toggleLeftSidebar}
                  value={entry}
                  key={index}
                  currentValue={currentEntry}
                  setCurrentValue={setCurrentEntry}>
                  <div className="w-100 d-flex flex-column align-items-start">
                    <H4
                      text={`#${entry.TicketNo}`}
                      className="text-start text-capitalize "
                    />
                    <p className="my-2" style={{ color: "#5C6D85" }}>
                      {entry.Subject}
                    </p>
                    <div className="d-flex align-items-center justify-content-between m-0 user_chatLeftSidebar__item__text user_chatLeftSidebar__item__text--case">
                      <span className="d-flex align-items-center ">
                        <div className="status_color" style={{ backgroundColor: `${entry.Status === "1" && "#7ECD7C" || entry.Status === "2" && "#4A8AE6" || entry.Status === "0" && "#FDF52E"}` }}></div>
                        {entry.Status === "1" ? "Completed" : "Progress"}</span>
                      <div className="d-flex align-items-center">
                        <span className="mx-2">Created: </span>
                        <p className="m-0" style={{ color: "#2F4058" }}>{formatDate(entry.CreationDate)}</p>
                      </div>
                    </div>
                  </div>
                </ChatLeftbarItemLayout>
              ))}
            </div>
          </>
        )}

        {(chatType == "clients-chat") && (
          <>
            {chatType === "clients-chat" ? (
              <H3 text={"Clients"} />
            ) : null}
            <ChatSearchBar setSearchVal={setSearchVal} />
            <div className="user_chatLeftSidebar__items">
              {entries
                .filter((entry) => !searchVal || entry.name.includes(searchVal))
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
                          <img src={userImg} alt="user" />
                        </div>
                      )}
                      <div
                        className={`
                        w-100 ${lang === "ar" ? "me-2" : "ms-2"}
                        `}>
                        <H4
                          text={
                            chatType === "clients-chat"
                              ? entry.name
                              : `#${entry.name}`
                          }
                          className={`text-capitalize
                          ${lang === "ar" ? "text-end " : "text-start "}
                          `}
                        />
                        <div className="d-flex align-items-center justify-content-between m-0 user_chatLeftSidebar__item__text">
                          <span>{t("UserPanel.Chat.LastMessage")}</span>
                          <span>24 OCT 2022 </span>
                        </div>
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
