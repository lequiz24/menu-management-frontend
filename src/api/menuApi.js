import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/menus';

export const fetchMenus = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const fetchMenu = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createMenu = async (menu) => {
    const response = await axios.post(API_URL, menu);
    return response.data;
};

export const updateMenu = async (id, menu) => {
    const response = await axios.put(`${API_URL}/${id}`, menu);
    return response.data;
};

export const deleteMenu = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
