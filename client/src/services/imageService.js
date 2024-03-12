import axios from "axios";

// function to upload image
export const uploadImage = async (data) => {
    const res = await fetch(
        `https://api.cloudinary.com/v1_1/jayant-cloud/image/upload`,
        {
            method: "POST",
            body: data,
        }
    );
    if (!res.ok) {
        alert("Image upload failed");
    }
    const imageData = await res.json();
    return imageData.url;
};

export const handleImageUpload = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "chat-app");
    formData.append("folder", "chat-app");

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/jayant-cloud/image/upload`,
            formData
        );

        const imageUrl = response.data.secure_url;
        return imageUrl
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
};
