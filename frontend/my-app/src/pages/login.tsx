import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  type FormDataType = {
    email: string;
    password: string;
  };

  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* @TODO: HANDLE LOGIN API CORRECTLY AND FIND THE CORRECT LOGIN ROUTE. */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        formData
      );
      setMessage(
        "Registration successful! You will be redirected to the login page."
      );

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="main-container flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="login-container bg-white p-8 rounded shadow-md w-80">
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="mb-4 w-full p-2 border border-gray-300 rounded"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="mb-4 w-full p-2 border border-gray-300 rounded"
            value={formData.password}
            onChange={handleChange}
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
      <div className="register mt-4">
        <p>
          Don't have an account?{" "}
          <button className="text-blue-500 underline">
            Click here to register
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
