import api from './api';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  image?: string;
  phone?: string;
}

export interface TeacherRequest {
  _id: string;
  name: string;
  email: string;
  image: string;
  experience: 'beginner' | 'experienced' | 'mid-level';
  title: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  userId: string;
}

export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const makeAdmin = async (userId: string) => {
  const response = await api.patch(`/users/${userId}/make-admin`);
  return response.data;
};

export const searchUsers = async (query: string) => {
  const response = await api.get(`/users/search?q=${query}`);
  return response.data;
};

export const updateProfile = async (userData: Partial<User>) => {
  const response = await api.put('/users/profile', userData);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const submitTeacherRequest = async (requestData: Omit<TeacherRequest, '_id' | 'status' | 'userId'>) => {
  const response = await api.post('/users/teacher-request', requestData);
  return response.data;
};

export const getAllTeacherRequests = async () => {
  const response = await api.get('/users/teacher-requests');
  return response.data;
};

export const approveTeacherRequest = async (requestId: string) => {
  const response = await api.patch(`/users/teacher-requests/${requestId}/approve`);
  return response.data;
};

export const rejectTeacherRequest = async (requestId: string) => {
  const response = await api.patch(`/users/teacher-requests/${requestId}/reject`);
  return response.data;
};

export const getMyTeacherRequest = async () => {
  const response = await api.get('/users/my-teacher-request');
  return response.data;
};