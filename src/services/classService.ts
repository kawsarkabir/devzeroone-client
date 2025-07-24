// import api from "./api";

// export interface Class {
//   _id: string;
//   title: string;
//   name: string;
//   email: string;
//   price: number;
//   description: string;
//   image: string;
//   status: "pending" | "approved" | "rejected";
//   category: string;
//   totalEnrollment: number;
//   createdAt: string;
// }

// export interface Assignment {
//   _id: string;
//   courseId: string;
//   title: string;
//   description: string;
//   deadline: string;
//   submissionCount: number;
// }
// // done
// export const getAllClasses = async () => {
//   const response = await api.get("/courses");
//   return response.data.data;
// };
// // done
// export const getPopularCourses = async () => {
//   const response = await api.get("/courses/popular");
//   return response.data.data;
// };
// // done
// export const getAllApprovedClasses = async () => {
//   const response = await api.get("/courses/approved");
//   return response.data.data;
// };
// // done
// export const getClassById = async (id: string) => {
//   const response = await api.get(`/courses/${id}`);
//   return response.data.data;
// };
// // done
// export const createClass = async (
//   classData: Omit<Class, "_id" | "status" | "totalEnrollment" | "createdAt">
// ) => {
//   const response = await api.post("/courses", classData);
//   console.log(response.data.data);
//   return response.data.data;
// };

// export const getMyClasses = async () => {
//   const response = await api.get("/courses/my-classes");
//   console.log(response.data.data);
//   return response.data.data;
// };

// export const updateClass = async (id: string, classData: Partial<Class>) => {
//   const response = await api.put(`/courses/${id}`, classData);
//   return response.data.data;
// };

// export const deleteClass = async (id: string) => {
//   const response = await api.delete(`/courses/${id}`);
//   return response.data.data;
// };

// export const approveClass = async (id: string) => {
//   const response = await api.patch(`/courses/status/${id}`, {
//     status: "approved",
//   });
//   return response.data;
// };

// export const rejectClass = async (id: string) => {
//   const response = await api.patch(`/courses/status/${id}`, {
//     status: "rejected",
//   });
//   return response.data;
// };

// export const getClassAssignments = async (courseId: string) => {
//   const response = await api.get(`/courses/${courseId}/assignments`);
//   return response.data.data;
// };

// export const createAssignment = async (
//   courseId: string,
//   assignmentData: Omit<Assignment, "_id" | "courseId" | "submissionCount">
// ) => {
//   const response = await api.post(
//     `/courses/${courseId}/assignments`,
//     assignmentData
//   );
//   console.log(response.data.data);
//   return response.data.data;
// };

// export const submitAssignment = async (
//   assignmentId: string,
//   submission: string
// ) => {
//   const response = await api.post(`/assignments/${assignmentId}/submit`, {
//     submission,
//   });
//   console.log(response.data.data);
//   return response.data.data;
// };

// export const searchClasses = async (query: string) => {
//   const response = await api.get(`/courses/search?q=${query}`);
//   return response.data.data;
// };

// export const enrollInClass = async (courseId: string) => {
//   const response = await api.post(`/courses/${courseId}/enroll`);
//   return response.data.data;
// };

// // export const getMyEnrolledClasses = async () => {
// //   const response = await api.get("/courses/my-enrolled");
// //   console.log(response.data.data);
// //   return response.data.data;
// // };

// // ENROLLMENT SERVICES
// export const getEnrollmentById = async (enrollmentId: string) => {
//   const response = await api.get(`/enrollments/${enrollmentId}`);
//   return response.data;
// };

// // Create enrollment
// export const enrollInClass = async (
//   classId: string,
//   paymentIntentId: string
// ) => {
//   const response = await api.post("/enrollments", { classId, paymentIntentId });
//   return response.data;
// };

// export const getMyEnrolledClasses = async () => {
//   const response = await api.get("/enrollments/my");
//   return response.data.enrollments; // Updated to match backend response
// };

// export const getClassStats = async (courseId: string) => {
//   const response = await api.get(`/courses/${courseId}/stats`);
//   return response.data.data;
// };

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

export interface Enrollment {
  _id: string;
  class: Class;
  user: string;
  paymentIntentId: string;
  amount: number;
  status: string;
  enrolledAt: string;
}

// ENROLLMENT SERVICES

export const createEnrollment = async (
  classId: string,
  paymentIntentId: string
): Promise<Enrollment> => {
  const response = await api.post("/enrollments", { classId, paymentIntentId });
  return response.data;
};

export const getMyEnrolledClasses = async (): Promise<Enrollment[]> => {
  const response = await api.get("/enrollments/my");
  console.log("Enrolled Classes:", response.data.enrollments);
  return response.data.enrollments;
};
export const getEnrollmentById = async (
  enrollmentId: string
): Promise<Enrollment> => {
  const response = await api.get(`/enrollments/${enrollmentId}`);
  return response.data;
};

// CLASS SERVICES
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

export const getMyClasses = async () => {
  const response = await api.get("/courses/my-classes");
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
  const response = await api.patch(`/courses/status/${id}`, {
    status: "approved",
  });
  return response.data;
};

export const rejectClass = async (id: string) => {
  const response = await api.patch(`/courses/status/${id}`, {
    status: "rejected",
  });
  return response.data;
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
