import { atom } from "recoil";

export const userState = atom({
    key: "userState", // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
});

export const chatsState = atom({
    key: "chatsState",
    default: [],
});

export const notificationsState = atom({
    key: "notificationsState",
    default: [],
});

export const selectedChatState = atom({
    key: "selectedChatState",
    default: [],
});
