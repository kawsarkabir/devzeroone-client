import api from "./api";

export interface Stats {
  totalUsers: number;
  totalClasses: number;
  totalEnrollments: number;
}

export const getStats = async (): Promise<Stats> => {
  const response = await api.get("/stats");
  console.log(response.data);
  return response.data;
};
