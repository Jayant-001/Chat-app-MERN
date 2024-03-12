import axios from "axios";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../Context/state";

const useAuth = () => {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem("token");
    const setUser = useSetRecoilState(userState);

    useEffect(() => {
        token &&
            token.length > 0 &&
            (async function () {
                setIsLoading(true);

                try {
                    const { data } = await axios.get(`${API_URL}api/users`, {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    });
                    console.log("data ", data);
                    setIsAuthenticated(true);
                    setUser(data);
                } catch (error) {
                    console.log("error ", error);
                    setUser(null);
                    setIsAuthenticated(false);
                    localStorage.setItem("token", "");
                } finally {
                    setIsLoading(false);
                }
            })();
    }, []);

    return [isAuthenticated, isLoading];
};

export default useAuth;
