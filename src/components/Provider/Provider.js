import axios from "axios";

const requestContainer = async (providerId, navigate, url, setProviderId) => {
  console.log(providerId);

  if (await checkProvider(providerId, url)) {
    navigate(`/createContainer/${providerId}`);
  } else {
    alert(`Something went wrong use another provider`);
  }
};
const checkProvider = async (providerId, url) => {
  try {
    let token = localStorage.getItem("token");
    const response = await axios.get(url + `/providers/${providerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(url);
    if (response.data) return true;
    return false;
  } catch (err) {
    console.error(err.response?.data?.error || "Something went wrong");
    return false;
  }
};
export { requestContainer };
