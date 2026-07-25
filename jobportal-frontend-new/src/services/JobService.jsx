import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/jobs";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllJobs = () => {
  return axios.get(REST_API_BASE_URL, getAuthHeader());
};

export const addJob = (job) => {
  return axios.post(REST_API_BASE_URL, job, getAuthHeader());
};

export const deleteJob = (id) => {
  return axios.delete(`${REST_API_BASE_URL}/${id}`, getAuthHeader());
};

export const updateJob = (id, job) => {
  return axios.put(`${REST_API_BASE_URL}/${id}`, job, getAuthHeader());
};

export const getJobById = (id) => {
  return axios.get(`${REST_API_BASE_URL}/${id}`, getAuthHeader());
};