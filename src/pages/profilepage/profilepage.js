export const handleLogout = (navigate) => {
  let token= localStorage.getItem('token');
  const response = await axios.post('http://localhost:8080/api/providers/logout',{token}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  localStorage.removeItem('token');
  localStorage.removeItem('Rstoken'); // Clear the token from localStorage
    navigate('/login'); // Redirect to the login page
  };