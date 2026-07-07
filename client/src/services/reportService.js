import API from "../api/api";

const getReports = async () => {
    const response = await API.get("/reports");
    return response.data;
};

export { getReports };