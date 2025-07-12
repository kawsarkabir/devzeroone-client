import api from './api';

export interface PaymentData {
  classId: string;
  amount: number;
  currency?: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  message: string;
}

export const processPayment = async (paymentData: PaymentData): Promise<PaymentResponse> => {
  // Simulate payment processing
  const response = await api.post('/payments/process', paymentData);
  return response.data;
};

export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
  const response = await api.post('/payments/create-intent', { amount, currency });
  return response.data;
};

export const confirmPayment = async (paymentIntentId: string) => {
  const response = await api.post('/payments/confirm', { paymentIntentId });
  return response.data;
};

export const getPaymentHistory = async () => {
  const response = await api.get('/payments/history');
  return response.data;
};

export const enrollInClass = async (classId: string, paymentData: PaymentData) => {
  const response = await api.post('/enrollments', { classId, ...paymentData });
  return response.data;
};