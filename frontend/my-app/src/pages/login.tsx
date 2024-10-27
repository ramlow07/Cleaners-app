import React from "react";

function LoginPage() {
  return (
    <div className="main-container flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="login-container bg-white p-8 rounded shadow-md w-80">
        <input
          type="text"
          placeholder="Email"
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded">
          Login
        </button>
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
