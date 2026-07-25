import axios from "axios";

const BASE_URL = "http://localhost:8080/applications";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const applyJob = (formData) => {
  return axios.post(
    `${BASE_URL}/apply`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const getApplications = () => {
  return axios.get(
    BASE_URL,
    getAuthHeader()
  );
};

export const updateStatus = (id, status) => {
  return axios.put(
    `${BASE_URL}/${id}/${status}`,
    {},
    getAuthHeader()
  );
};