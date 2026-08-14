// const API_URL = "http://localhost:3000/api";
const API_URL = "back-production-e7eb.up.railway.app/api";

export const trackVisit = async (): Promise<void> => {
  const response = await fetch(`${API_URL}/analytics/visit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to track visit");
  }
};

export const trackLoginAttempt = async (): Promise<void> => {
  const response = await fetch(`${API_URL}/analytics/login-attempt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to track login attempt");
  }
};