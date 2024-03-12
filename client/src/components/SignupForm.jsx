import axios from "axios";
import {
    Flex,
    Heading,
    Input,
    Button,
    FormControl,
    FormLabel,
    Switch,
    useColorMode,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { handleImageUpload } from "../services/imageService";

const SignupForm = () => {
    const { toggleColorMode } = useColorMode();
    const formBackground = useColorModeValue("gray.100", "gray.700");
    const toast = useToast();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        profilePicture: "",
    });
    const [image, setImage] = useState(null);
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        toast({
            title: "Sending request.",
            description: "Hold on we are creating your account.",
            status: "loading",
            duration: 2000,
            isClosable: true,
        });

        setIsLoading(true);

        try {
            let userData = { ...formData };
            if (image) {
                const imageUrl = await handleImageUpload(image, setFormData);
                userData = { ...formData, profilePicture: imageUrl };
            }

            await axios.post(`${API_URL}api/auth/register`, userData);

            toast({
                title: "Account created.",
                description: "We've created your account for you.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
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

    // set image
    const handleImageChange = async (e) => {
        e.preventDefault();
        const image = e.target.files[0];

        if (image.size > 1010000) {
            toast({
                title: "Image size too large.",
                description: "Image size nust be less than 1MB.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        setImage(image);
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
                <Heading mb={6}>Register</Heading>
                <Input
                    placeholder="John Doe"
                    type="text"
                    variant="filled"
                    mb={3}
                    size="lg"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
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
                <Input
                    type="file"
                    variant="filled"
                    mb={3}
                    size="lg"
                    name="ljd"
                    p={1.5}
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <Button
                    colorScheme="teal"
                    mb={8}
                    onClick={handleSubmit}
                    isLoading={isLoading}
                >
                    Register
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

export default SignupForm;
