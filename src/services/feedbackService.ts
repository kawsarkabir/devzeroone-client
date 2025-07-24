import api from "./api";

export interface Feedback {
  _id: string;
  description: string;
  rating: number;
  name: string;
  image: string;
  title: string;
  classId: string;
  userId: string;
  createdAt: string;
}

export const getAllFeedback = async (): Promise<Feedback[]> => {
  const response = await api.get("/feedback");
  console.log("All feedback:", response.data);
  return response.data;
};

export const createFeedback = async (
  feedbackData: Omit<Feedback, "_id" | "userId" | "createdAt">
): Promise<Feedback> => {
  const response = await api.post("/feedback", feedbackData);
  console.log("Feedback created:", response.data);
  return response.data;
};

export const getFeedbackByClass = async (
  classId: string
): Promise<Feedback[]> => {
  const response = await api.get(`/feedback/course/${classId}`);
  console.log("Feedback for class:", response.data);
  return response.data;
};
