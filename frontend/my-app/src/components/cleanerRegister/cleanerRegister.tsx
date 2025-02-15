import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CleanerRegister() {
  const navigate = useNavigate();

  const cleanerServicesList = [
    "Deep Cleaning",
    "House Cleaning",
    "Apartment Cleaning",
  ];

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    services: [] as string[],
    location: "",
    contact: "",
  });
  const [message, setMessage] = useState("");

  const handleCheckboxChange = (services: string) => {
    setSelectedServices(
      (prev) =>
        prev.includes(services)
          ? prev.filter((s) => s !== services) // ✅ Correctly closed parenthesis
          : [...prev, services] // ✅ Correctly formatted
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        formData
      );
      console.log(formData);
      setMessage(
        "Registration successful! You will be redirected to the login page."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="main-container flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="login-container bg-white p-8 rounded shadow-md w-80">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mb-4 w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mb-4 w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mb-4 w-full p-2 border border-gray-300 rounded"
          />
          <label htmlFor="">
            <input
              type="checkbox"
              name="Deep Cleaning"
              checked={formData.services.includes("Deep Cleaning")}
              value={formData.services}
              onChange={() => handleCheckboxChange("DeepCleaning")}
              required
              className="mb-4 w-full p-2 border border-gray-300 rounded"
            />
            Deep Cleaning
          </label>
          <button
            type="submit"
            className="mb-4 w-full p-2 border border-blue-300 rounded"
          >
            Register
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default CleanerRegister;
