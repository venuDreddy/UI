import axios from "axios";

export const handleLogout = async (navigate, API_URL) => {
  let token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      API_URL + "/auth/logout",
      { token },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.log(err);
  }
  localStorage.removeItem("token");
  localStorage.removeItem("Rstoken"); // Clear the token from localStorage
  navigate("/login"); // Redirect to the login page
};
