import React, { useEffect, useState } from 'react'
import { H2 } from '../../../user/components'
import { CardLayout, ChatLeftSidebar, ChatMain, ChatRightSidebar } from '../../../user/containers'
import { useLocation } from 'react-router-dom';

const tickets = [
    {
        id: '123',
        name: '123456',
        status: "Active",
        created: "24 OCT 2022"
    },
    {
        id: '456',
        name: '7891',
        status: "Completed",
        created: "24 OCT 2022"
    },
    {
        id: '456',
        name: '34567',
        status: "Progress",
        created: "24 OCT 2022"
    },
]

const chatmembers = [
    { name: "asad", type: "Expertise" },
    { name: "faisal", type: "Speciality" },
];

const documents = [
    { name: "Name of the document", size: "120kb", type: "user" },
    { name: "Name of the document", size: "120kb", type: "user" },
    { name: "Name of the document", size: "120kb", type: "experts" },
    { name: "Name of the document", size: "120kb", type: "experts" },
    { name: "Name of the document", size: "120kb", type: "admin" },
    { name: "Name of the document", size: "120kb", type: "admin" },
];
const ticketDummyMessages = [
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
]

const RespondTicket = () => {

    const [isLeftSidebarHidden, setisLeftSidebarHidden] = useState(true);
    const location = useLocation().pathname.split("/")[2];
    const [createTicketModal, setCreateTicketModal] = useState(false);
    const [chatType, setChatType] = useState("");
    const [isRightSidebarHidden, setisRightSidebarHidden] = useState(true);

    useEffect(() => {
        setChatType(location);
    }, [location]);

    const [entries, setEntries] = useState([]);
    const [currentEntry, setCurrentEntry] = useState({});
    const [messages, setMessages] = useState(ticketDummyMessages);
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

    useEffect(() => {
        if (chatType === "support") {
            setEntries(tickets);
            setCurrentEntry(tickets[0]);
            setMessages([]);
        }
    }, [chatType]);

    const toggleLeftSidebar = () => {
        setisLeftSidebarHidden((prevState) => !prevState);
    };
    const toggleRightSidebar = () => {
        setisRightSidebarHidden((prevState) => !prevState);
    };
    const toggleTicketModal = () => {
        setCreateTicketModal((prevState) => !prevState);
    };

    return (
        <>
            <H2 text={"SUPPORT"} className='mb-4' />
            <div className="user_chat">
                <CardLayout className="mt-0 p-0 user_chat__inner">
                    <ChatLeftSidebar
                        isLeftSidebarHidden={isLeftSidebarHidden}
                        toggleLeftSidebar={toggleLeftSidebar}
                        chatType={chatType}
                        entries={entries}
                        currentEntry={currentEntry}
                        setCurrentEntry={setCurrentEntry}
                        // Ticket
                        toggleTicketModal={toggleTicketModal}
                        type="support"
                    />
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
                        type="support"
                    />
                </CardLayout>
            </div>
        </>
    )
}

export default RespondTicket
