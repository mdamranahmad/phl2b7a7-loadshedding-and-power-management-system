import { ofetch } from "ofetch";

const BASE_URL = process.env.API_BASE_URL;

const apiClient = ofetch.create({ baseURL: BASE_URL });

export default apiClient;
