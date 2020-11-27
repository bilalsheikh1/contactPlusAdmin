import axios from "axios";

// const baseURL = "http://localhost:8000";
// const baseURL = "http://10.89.189.101/contactplusapi/public";
const baseURL = "http://api.contact-plus.com/contactplusapi/public";
// const baseURL = "https://api.contactplus.com";

const apiClient = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

export default apiClient;
