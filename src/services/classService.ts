import api from "./api";

export interface Class {
  _id: string;
  title: string;
  name: string;
  email: string;
  price: number;
  description: string;
  image: string;
  status: "pending" | "approved" | "rejected";
  category: string;
  totalEnrollment: number;
  createdAt: string;
}

export interface Assignment {
  _id: string;
  classId: string;
  title: string;
  description: string;
  deadline: string;
  submissionCount: number;
}

export const getAllClasses = async () => {
  const response = await api.get("/classes");
  return response.data;
};

export const getPopularCourses = async () => {
  try {
    const response = await api.get('/courses/popular');
    console.log('API Response in getPopularCourses:', response.data); // Debug log
    return response.data.data;
  } catch (error) {
    console.error('Error fetching popular courses:', error); // Debug log
    throw error;
  }
};

export const getApprovedClasses = async () => {
  const response = await api.get("/classes/approved");
  return response.data;
};

export const getClassById = async (id: string) => {
  const response = await api.get(`/classes/${id}`);
  return response.data;
};

export const createClass = async (
  classData: Omit<Class, "_id" | "status" | "totalEnrollment" | "createdAt">
) => {
  const response = await api.post("/classes", classData);
  return response.data;
};

export const updateClass = async (id: string, classData: Partial<Class>) => {
  const response = await api.put(`/classes/${id}`, classData);
  return response.data;
};

export const deleteClass = async (id: string) => {
  const response = await api.delete(`/classes/${id}`);
  return response.data;
};

export const approveClass = async (id: string) => {
  const response = await api.patch(`/classes/${id}/approve`);
  return response.data;
};

export const rejectClass = async (id: string) => {
  const response = await api.patch(`/classes/${id}/reject`);
  return response.data;
};

export const enrollInClass = async (classId: string) => {
  const response = await api.post(`/classes/${classId}/enroll`);
  return response.data;
};

export const getMyEnrolledClasses = async () => {
  const response = await api.get("/classes/my-enrolled");
  return response.data;
};

export const getMyClasses = async () => {
  const response = await api.get("/classes/my-classes");
  return response.data;
};

export const getClassAssignments = async (classId: string) => {
  const response = await api.get(`/classes/${classId}/assignments`);
  return response.data;
};

export const createAssignment = async (
  classId: string,
  assignmentData: Omit<Assignment, "_id" | "classId" | "submissionCount">
) => {
  const response = await api.post(
    `/classes/${classId}/assignments`,
    assignmentData
  );
  return response.data;
};

export const submitAssignment = async (
  assignmentId: string,
  submission: string
) => {
  const response = await api.post(`/assignments/${assignmentId}/submit`, {
    submission,
  });
  return response.data;
};

export const searchClasses = async (query: string) => {
  const response = await api.get(`/classes/search?q=${query}`);
  return response.data;
};

export const getAllApprovedClasses = async () => {
  const response = await api.get("/classes/approved");
  return response.data;
};

export const getClassStats = async (classId: string) => {
  const response = await api.get(`/classes/${classId}/stats`);
  return response.data;
};
