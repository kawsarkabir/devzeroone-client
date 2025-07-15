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
  courseId: string;
  title: string;
  description: string;
  deadline: string;
  submissionCount: number;
}

export const getAllClasses = async () => {
  const response = await api.get("/courses");
  return response.data.data;
};

export const getPopularCourses = async () => {
  const response = await api.get("/courses/popular");
  return response.data.data;
};

export const getAllApprovedClasses = async () => {
  const response = await api.get("/courses/approved");
  return response.data.data;
};

export const getClassById = async (id: string) => {
  const response = await api.get(`/courses/${id}`);
  return response.data.data;
};

export const createClass = async (
  classData: Omit<Class, "_id" | "status" | "totalEnrollment" | "createdAt">
) => {
  const response = await api.post("/courses", classData);
  return response.data.data;
};

export const updateClass = async (id: string, classData: Partial<Class>) => {
  const response = await api.put(`/courses/${id}`, classData);
  return response.data.data;
};

export const deleteClass = async (id: string) => {
  const response = await api.delete(`/courses/${id}`);
  return response.data.data;
};

export const approveClass = async (id: string) => {
  const response = await api.patch(`/courses/${id}/approve`);
  return response.data.data;
};

export const rejectClass = async (id: string) => {
  const response = await api.patch(`/courses/${id}/reject`);
  return response.data.data;
};

export const enrollInClass = async (courseId: string) => {
  const response = await api.post(`/courses/${courseId}/enroll`);
  return response.data.data;
};

export const getMyEnrolledClasses = async () => {
  const response = await api.get("/courses/my-enrolled");
  return response.data.data;
};

export const getMyClasses = async () => {
  const response = await api.get("/courses/my-classes");
  return response.data.data;
};

export const getClassAssignments = async (courseId: string) => {
  const response = await api.get(`/courses/${courseId}/assignments`);
  return response.data.data;
};

export const createAssignment = async (
  courseId: string,
  assignmentData: Omit<Assignment, "_id" | "courseId" | "submissionCount">
) => {
  const response = await api.post(
    `/courses/${courseId}/assignments`,
    assignmentData
  );
  return response.data.data;
};

export const submitAssignment = async (
  assignmentId: string,
  submission: string
) => {
  const response = await api.post(`/assignments/${assignmentId}/submit`, {
    submission,
  });
  return response.data.data;
};

export const searchClasses = async (query: string) => {
  const response = await api.get(`/courses/search?q=${query}`);
  return response.data.data;
};

export const getClassStats = async (courseId: string) => {
  const response = await api.get(`/courses/${courseId}/stats`);
  return response.data.data;
};
