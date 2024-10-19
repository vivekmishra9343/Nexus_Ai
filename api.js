export const apiRequest = async (endpoint, method = "GET", data = null) => {
  const url = `http://localhost:4000${endpoint}`; // Adjust the base URL as needed
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Important for cookies
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Something went wrong");
  }

  return responseData;
};
