// src/api/apiService.ts
import { IResume } from '../context/interfaceTypes';
import axiosInstance from './axiosInstance';

// export const login = async (credentials) => {
//   const response = await axiosInstance.post('/login', credentials);
//   return response.data;
// };

// export const signup = async (userData) => {
//   const response = await axiosInstance.post('/signup', userData);
//   return response.data;
// };
export interface ICreateResume{
    title:string,
    username:string,
    useremail:string
}
export const createResume = async (resumeData : ICreateResume) => {
  const response = await axiosInstance.post('/resume/create', resumeData);
  return response.data;
};
export const getResume = async (id: string) =>{
  const response = await axiosInstance.get(`/resume/getResume/${id}`);
  return response.data;
}

export const updateResume = async (id : string, resumeData: IResume) => {
  const response = await axiosInstance.put(`/resume/update/${id}`, resumeData);
  console.log(response.data.newResume);
  return response.data.newResume;
};

// export const sendResume = async (id, recipientData) => {
//   const response = await axiosInstance.post(`/resumes/${id}/send`, recipientData);
//   return response.data;
// };
