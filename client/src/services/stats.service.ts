export interface AnalyticsStats {
  totalVisits: number;
  loginAttempts: number;
}

interface StatsResponse {
  success: boolean;
  data: AnalyticsStats;
}

// const API_URL = "http://localhost:3000/api";
const API_URL = "back-production-e7eb.up.railway.app/api";


export const getAnalyticsStats = async (): Promise<AnalyticsStats> => {
  const response = await fetch(`${API_URL}/stats`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch analytics statistics");
  }

  const result: StatsResponse = await response.json();

  return result.data;
};