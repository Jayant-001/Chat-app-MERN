import LoginForm from "./components/LoginForm";
import {
    Tabs,
    Container,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
} from "@chakra-ui/react";
import SignupForm from "./components/SignupForm";
import useAuth from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
    const navigate = useNavigate();
    const [isAuthenticated, isLoading] = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/chats");
        }
    }, [isAuthenticated]);

    return (
        <>
            { isLoading ? (
                <h1>Loading auth</h1>
            ) : (
                <Container mt="100px">
                    <Tabs isFitted variant="enclosed">
                        <TabList mb="1em">
                            <Tab>Login</Tab>
                            <Tab>Register</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <LoginForm />
                            </TabPanel>
                            <TabPanel>
                                <SignupForm />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Container>
            )}
        </>
    );
}

export default App;
