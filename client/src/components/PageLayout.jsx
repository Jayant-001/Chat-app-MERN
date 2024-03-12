// import axios from "axios";
import { Flex} from "@chakra-ui/react";
// import { useEffect } from "react";
// import { userState } from "../Context/state";
// import { useSetRecoilState } from "recoil";

const PageLayout = ({ children }) => {
    // const API_URL = import.meta.env.VITE_API_BASE_URL;
    // const token = localStorage.getItem("token");
    // const setUser = useSetRecoilState(userState);    
    // const toast = useToast();

    // useEffect(() => {
    //     (async function () {
    //         try {
    //             const { data } = await axios.get(`${API_URL}api/users`, {
    //                 headers: {
    //                     Authorization: "Basic " + token,
    //                 },
    //             });
    //             setUser(data);
    //         } catch (error) {
    //             toast({
    //                 title: "Authentication failure",
    //                 description: error.response.data.error,
    //                 status: "error",
    //                 duration: 3000,
    //                 isClosable: true,
    //             });
    //         }
    //     })();
    // }, []);

    return <Flex h="100vh">{children}</Flex>;
};

export default PageLayout;
