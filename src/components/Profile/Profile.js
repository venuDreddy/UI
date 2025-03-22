export const fetchProfileData = async (navigate,API_URL) => {
  const token = localStorage.getItem('Rstoken');

  if (!token) {
    navigate('/login'); // Redirect if token is missing
    return null;
  }

  try {
    const response = await fetch(API_URL+'/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      navigate('/login'); // Redirect on unauthorized access
      return null;
    }

    if (!response.ok) throw new Error('Failed to fetch profile');

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
