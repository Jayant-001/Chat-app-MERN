import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const LoginPage = () => {
    const [isError, setIsError] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (formData.email === "") setIsError(true);
    }, [formData]);

    const handleInputChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <FormControl isInvalid={isError}>
            <FormLabel>Email</FormLabel>
            <Input
                type="email"
                value={formData.email}
                onChange={handleInputChange}
            />
            {!isError ? (
                <FormHelperText>
                    Enter the email you'd like to receive the newsletter on.
                </FormHelperText>
            ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
            )}
        </FormControl>
    );
};

export default LoginPage;
