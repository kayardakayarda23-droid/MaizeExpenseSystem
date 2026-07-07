import API from "../api/api";

export const getProfile = async () => {
    const response = await API.get("/profile");
    return response.data;
};