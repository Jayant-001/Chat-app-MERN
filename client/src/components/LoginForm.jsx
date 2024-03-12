import axios from "axios";
import {
    Flex,
    Heading,
    Input,
    Button,
    FormControl,
    FormLabel,
    Switch,
    useToast,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const { toggleColorMode } = useColorMode();
    const formBackground = useColorModeValue("gray.100", "gray.700");
    const toast = useToast();
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        toast({
            title: "Sending request.",
            description: "Hold on we are checking credentials.",
            status: "loading",
            duration: 1000,
            isClosable: true,
        });

        setIsLoading(true);

        try {
            const { data } = await axios.post(
                `${API_URL}api/auth/login`,
                formData
            );

            localStorage.setItem("token", data.token);

            toast({
                title: "Login successfully",
                description: "Hey, You are ready to rock.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate("/chats");
        } catch (error) {
            toast({
                title: "Invalid request",
                description: error.response.data.error,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fillGuestUser = (e) => {
        e.preventDefault();

        setFormData({ email: "jayant5@gmail.com", password: "jayant" });
    };

    return (
        <Flex alignItems="center" justifyContent="center">
            <Flex
                flexDirection="column"
                bg={formBackground}
                p={12}
                borderRadius={8}
                boxShadow="lg"
            >
                <Heading mb={6}>Log In</Heading>
                <Input
                    placeholder="johndoe@gmail.com"
                    type="email"
                    variant="filled"
                    mb={3}
                    size="lg"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <Input
                    placeholder="**********"
                    type="password"
                    variant="filled"
                    mb={6}
                    size="lg"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <Button
                    colorScheme="teal"
                    mb={8}
                    onClick={handleSubmit}
                    isLoading={isLoading}
                >
                    Log In
                </Button>
                <Button
                    colorScheme="orange"
                    variant="outline"
                    mb={8}
                    onClick={fillGuestUser}
                    isLoading={isLoading}
                >
                    Get guest user info
                </Button>
                <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="dark_mode" mb="0">
                        Enable Dark Mode?
                    </FormLabel>
                    <Switch
                        id="dark_mode"
                        colorScheme="teal"
                        size="lg"
                        onChange={toggleColorMode}
                    />
                </FormControl>
            </Flex>
        </Flex>
    );
};

export default LoginForm;
