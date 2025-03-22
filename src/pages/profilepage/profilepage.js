export const handleLogout = async (navigate, API_URL) => {
  let token = localStorage.getItem("token");
  const response = await axios.post(
    API_URL + "/providers/logout",
    { token },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  localStorage.removeItem("token");
  localStorage.removeItem("Rstoken"); // Clear the token from localStorage
  navigate("/login"); // Redirect to the login page
};
