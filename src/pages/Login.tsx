import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://dev-e4ku1v7ew7mf7e2u.us.auth0.com/oauth/token",
        {
          grant_type: "password",
          username: email,
          password: password,
          client_id: "1zcMLi8sGrpqg73VnXsZnJ4lbcBWQBQV", // public — safe for frontend
          scope: "openid profile email",
        }
      );

      const { id_token } = response.data;

      localStorage.setItem("id_token", id_token);
      navigate("/dashboard"); // redirect on success
    } catch (err: unknown) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl mb-4">Login to MediCall</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-2 rounded bg-gray-800"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-4 py-2 rounded bg-gray-800"
        />
        <button type="submit" className="bg-[#4F8EF7] px-4 py-2 rounded">
          Login
        </button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </form>
    </div>
  );
}
