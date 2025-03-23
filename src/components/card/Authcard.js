import axios from "axios";

export const handleSubmit = async (
  e,
  isLogin,
  name,
  email,
  password,
  confirmPassword,
  setError,
  setLoading,
  navigate,
  API_URL // Add navigate as a parameter
) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  // Validation
  if (!email.includes("@")) {
    setError("Please enter a valid email.");
    setLoading(false);
    return;
  }
  if (password.length < 6) {
    setError("Password must be at least 6 characters long.");
    setLoading(false);
    return;
  }
  if (!isLogin && name.trim() === "") {
    setError("Name cannot be empty.");
    setLoading(false);
    return;
  }
  if (!isLogin && password !== confirmPassword) {
    setError("Passwords do not match.");
    setLoading(false);
    return;
  }

  try {
    const url = isLogin ? API_URL + "/auth/login" : API_URL + "/auth/signup";
    const data = isLogin ? { email, password } : { name, email, password };
    const response = await axios.post(url, data);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("Rstoken", response.data.token); // Store token for authentication
    }

    alert(isLogin ? "Login successful!" : "Signup successful!");
    navigate("/#dashboard"); // Use navigate to redirect
  } catch (err) {
    setError(err.response?.data?.error || "Something went wrong");
  } finally {
    setLoading(false);
  }
};
