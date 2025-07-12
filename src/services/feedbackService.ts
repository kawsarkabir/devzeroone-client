import api from './api';

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

export const getAllFeedback = async () => {
  const response = await api.get('/feedback');
  return response.data;
};

export const createFeedback = async (feedbackData: Omit<Feedback, '_id' | 'userId' | 'createdAt'>) => {
  const response = await api.post('/feedback', feedbackData);
  return response.data;
};

export const getFeedbackByClass = async (classId: string) => {
  const response = await api.get(`/feedback/class/${classId}`);
  return response.data;
};