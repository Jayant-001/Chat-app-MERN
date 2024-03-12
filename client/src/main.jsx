import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatsPage from "./pages/ChatsPage";
import LoginPage from "./pages/LoginPage.jsx";
import PageLayout from "./components/PageLayout.jsx";
import { RecoilRoot } from "recoil";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/chats",
        element: <ChatsPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RecoilRoot>
        <PageLayout>
            <ChakraProvider>
                <RouterProvider router={router} />
            </ChakraProvider>
        </PageLayout>
    </RecoilRoot>
);
