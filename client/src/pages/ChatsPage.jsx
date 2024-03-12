import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../Context/state";
import SideDrawer from "../components/SideDrawer";
import MyChatsList from "../components/MyChatsList";
import ChatBox from "../components/ChatBox";
import { Box } from "@chakra-ui/react";

const ChatsPage = () => {
    const [chats, setChats] = useState([]);
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const [user, setUser] = useRecoilState(userState);

    const fetchAllUsers = async () => {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(`${API_URL}api/users/all`, {
            headers: {
                Authorization: "Basic " + token,
            },
        });

        console.log(data);
    };
    
    // fetchAllUsers();

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box
                d="flex"
                justifyContent="space-between"
                w="100%"
                h="91.5vh"
                p="10px"
            >
                {user && <MyChatsList />}
                {user && <ChatBox />}
            </Box>
        </div>
    );
};

export default ChatsPage;
