import React, { useEffect, useState } from "react";
import {
  CardLayout,
  ChatLeftSidebar,
  ChatMain,
  ChatRightSidebar,
} from "../../containers";
import { useTranslation } from "react-i18next";
import "./chat.css";
import { useLocation } from "react-router-dom";

const expertsDummyMessages = [
  {
    text: "Hello Abdullah! I hope you're having a fantastic day. Have you tried the new restaurant downtown? I heard they have amazing food!",
    time: "12:00",
    isMine: false,
    sender: "asad",
    sentTo: null,
  },
  {
    text: "Hey John! Yes, I went there last weekend. The food was indeed incredible. We should plan to go together sometime.",
    time: "12:05",
    isMine: false,
    sender: "asad",
    sentTo: null,
  },
  {
    text: "Arslan, have you read the latest novel by your favorite author? It's a masterpiece!",
    time: "12:10",
    isMine: false,
    sender: "faisal",
    sentTo: null,
  },
  {
    text: "Oh wow! I haven't had the chance yet, but I'm definitely going to check it out. Thanks for the recommendation!",
    time: "12:15",
    isMine: false,
    sender: "hamza",
    sentTo: null,
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:20",
    isMine: true,
    sender: null,
    sentTo: "asad",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:25",
    isMine: true,
    sender: null,
    sentTo: "hamza",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:25",
    isMine: true,
    sender: null,
    sentTo: "saad",
  },
];
const experts = [
  { name: "asad", lastMessage: "12:00" },
  { name: "faisal", lastMessage: "12:00" },
  { name: "hamza", lastMessage: "12:00" },
  { name: "saad", lastMessage: "12:00" },
  { name: "ali", lastMessage: "12:00" },
];

const clients = [
  { name: "Ali Ahmed", lastMessage: "12:00" },
  { name: "Ali Ahmed", lastMessage: "12:00" },
  { name: "Ali Ahmed", lastMessage: "12:00" },
  { name: "Ali Ahmed", lastMessage: "12:00" },
]

const casesDummyMessages = [
  {
    text: "Hello Abdullah! I hope you're having a fantastic day. Have you tried the new restaurant downtown? I heard they have amazing food!",
    time: "12:00",
    isMine: false,
    sender: "case1",
    sentTo: null,
  },
  {
    text: "Hey John! Yes, I went there last weekend. The food was indeed incredible. We should plan to go together sometime.",
    time: "12:05",
    isMine: false,
    sender: "case1",
    sentTo: null,
  },
  {
    text: "Arslan, have you read the latest novel by your favorite author? It's a masterpiece!",
    time: "12:10",
    isMine: false,
    sender: "case2",
    sentTo: null,
  },
  {
    text: "Oh wow! I haven't had the chance yet, but I'm definitely going to check it out. Thanks for the recommendation!",
    time: "12:15",
    isMine: false,
    sender: "case3",
    sentTo: null,
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:20",
    isMine: true,
    sender: null,
    sentTo: "case1",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:25",
    isMine: true,
    sender: null,
    sentTo: "case3",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:25",
    isMine: true,
    sender: null,
    sentTo: "case4",
  },
];
const clientsDummyMessages = [
  {
    text: "Hello Abdullah! I hope you're having a fantastic day. Have you tried the new restaurant downtown? I heard they have amazing food!",
    time: "12:00",
    isMine: false,
    sender: "Ali Ahmed",
    sentTo: null,
  },
  {
    text: "Hey John! Yes, I went there last weekend. The food was indeed incredible. We should plan to go together sometime.",
    time: "12:05",
    isMine: false,
    sender: "case1",
    sentTo: null,
  },
  {
    text: "Arslan, have you read the latest novel by your favorite author? It's a masterpiece!",
    time: "12:10",
    isMine: false,
    sender: "case2",
    sentTo: null,
  },
]
const cases = [
  { name: "case1", lastMessage: "12:00", status: "active" },
  { name: "case2", lastMessage: "12:00", status: "completed" },
  { name: "case3", lastMessage: "12:00", status: "in progress" },
];

const adminDummyMessages = [
  {
    text: "Hello Abdullah! I hope you're having a fantastic day. Have you tried the new restaurant downtown? I heard they have amazing food!",
    time: "12:00",
    isMine: false,
    sender: "admin",
    sentTo: null,
  },
  {
    text: "Hey John! Yes, I went there last weekend. The food was indeed incredible. We should plan to go together sometime.",
    time: "12:05",
    isMine: false,
    sender: "admin",
    sentTo: null,
  },
  {
    text: "Arslan, have you read the latest novel by your favorite author? It's a masterpiece!",
    time: "12:10",
    isMine: false,
    sender: "admin",
    sentTo: null,
  },
  {
    text: "Oh wow! I haven't had the chance yet, but I'm definitely going to check it out. Thanks for the recommendation!",
    time: "12:15",
    isMine: false,
    sender: "admin",
    sentTo: null,
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:20",
    isMine: true,
    sender: null,
    sentTo: "admin",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:25",
    isMine: true,
    sender: null,
    sentTo: "admin",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:25",
    isMine: true,
    sender: null,
    sentTo: "admin",
  },
];

const tickets = [
  { name: "123456", lastMessage: "12:00" },
  { name: "432456", lastMessage: "12:00" },
  { name: "131109", lastMessage: "12:00" },
  { name: "313131", lastMessage: "12:00" },
];

const ticketsDummyMessages = [
  {
    text: "Hello Abdullah! I hope you're having a fantastic day. Have you tried the new restaurant downtown? I heard they have amazing food!",
    time: "12:00",
    isMine: false,
    sender: "123456",
    sentTo: null,
  },
  {
    text: "Hey John! Yes, I went there last weekend. The food was indeed incredible. We should plan to go together sometime.",
    time: "12:05",
    isMine: false,
    sender: "123456",
    sentTo: null,
  },
  {
    text: "Arslan, have you read the latest novel by your favorite author? It's a masterpiece!",
    time: "12:10",
    isMine: false,
    sender: "432456",
    sentTo: null,
  },
  {
    text: "Oh wow! I haven't had the chance yet, but I'm definitely going to check it out. Thanks for the recommendation!",
    time: "12:15",
    isMine: false,
    sender: "131109",
    sentTo: null,
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:20",
    isMine: true,
    sender: null,
    sentTo: "123456",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:25",
    isMine: true,
    sender: null,
    sentTo: "313131",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:25",
    isMine: true,
    sender: null,
    sentTo: "123456",
  },
];

const chatmembers = [
  { name: "asad", type: "expert" },
  { name: "faisal", type: "user" },
];

const documents = [
  { name: "Name of the document", size: "120kb", type: "user" },
  { name: "Name of the document", size: "120kb", type: "user" },
  { name: "Name of the document", size: "120kb", type: "experts" },
  { name: "Name of the document", size: "120kb", type: "experts" },
  { name: "Name of the document", size: "120kb", type: "admin" },
  { name: "Name of the document", size: "120kb", type: "admin" },
];

const Chat = () => {
  const { t } = useTranslation();
  const location = useLocation().pathname.split("/")[2];
  const [chatType, setChatType] = useState("");

  useEffect(() => {
    setChatType(location);
  }, [location]);

  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatType === "experts-chat") {
      setEntries(experts);
      setCurrentEntry(experts[0]);
      setMessages(expertsDummyMessages);
    } else if (chatType === "cases-chat") {
      setEntries(cases);
      setCurrentEntry(cases[0]);
      setMessages(casesDummyMessages);
    } else if (chatType === "admin-chat") {
      setEntries([]);
      setCurrentEntry({ name: "admin" });
      setMessages(adminDummyMessages);
    } else if (chatType === "support") {
      setEntries(tickets);
      setCurrentEntry(tickets[0]);
      setMessages(ticketsDummyMessages);
    } else if (chatType === "clients-chat") {
      setEntries(clients);
      setCurrentEntry(clients[0]);
      setMessages(clientsDummyMessages);
    }
  }, [chatType]);

  const [messagesToDisplay, setMessagesToDisplay] = useState(messages);

  useEffect(() => {
    setMessagesToDisplay(
      messages.filter(
        (message) =>
          message.sender === currentEntry.name ||
          message.sentTo === currentEntry.name
      )
    );
  }, [currentEntry, messages]);

  const [isLeftSidebarHidden, setisLeftSidebarHidden] = useState(true);
  const toggleLeftSidebar = () => {
    setisLeftSidebarHidden((prevState) => !prevState);
  };
  const [isRightSidebarHidden, setisRightSidebarHidden] = useState(true);
  const toggleRightSidebar = () => {
    setisRightSidebarHidden((prevState) => !prevState);
  };

  // Ticket
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    status: "New",
  });
  const ticketInputHandler = (e) => {
    setNewTicket((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const [createTicketModal, setCreateTicketModal] = useState(false);
  const toggleTicketModal = () => {
    setCreateTicketModal((prevState) => !prevState);
  };

  return (
    <>
      <div className="user_chat">
        <CardLayout className="mt-0 p-0 user_chat__inner">
          {chatType !== "admin-chat" && (
            <ChatLeftSidebar
              isLeftSidebarHidden={isLeftSidebarHidden}
              toggleLeftSidebar={toggleLeftSidebar}
              chatType={chatType}
              entries={entries}
              currentEntry={currentEntry}
              setCurrentEntry={setCurrentEntry}
              // Ticket
              toggleTicketModal={toggleTicketModal}
            />
          )}
          <ChatMain
            toggleLeftSidebar={toggleLeftSidebar}
            toggleRightSidebar={toggleRightSidebar}
            setMessages={setMessages}
            messagesToDisplay={messagesToDisplay}
            currentEntry={currentEntry}
            chatType={chatType}
            // Ticket
            ticketInputHandler={ticketInputHandler}
            newTicket={newTicket}
            toggleTicketModal={toggleTicketModal}
            createTicketModal={createTicketModal}
          />
          <ChatRightSidebar
            isRightSidebarHidden={isRightSidebarHidden}
            toggleRightSidebar={toggleRightSidebar}
            chatmembers={chatmembers}
            documents={documents}
          />
        </CardLayout>
      </div>
    </>
  );
};

export default Chat;
