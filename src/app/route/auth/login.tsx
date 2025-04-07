import React, { useState } from "react";
import { useLogin } from "@/lib/auth.tsx";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const LoginRoute = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = useLogin({
    onSuccess: async () => {
      navigate("/");
    },
    onError: (error) => {
      if (error instanceof AxiosError)
        if (error.status === 404) setErrorMessage("Credenciais inválidas");
        else setErrorMessage(error.message);
    },
  });

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    login.mutate({
      username: username,
      password: password,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 font-sans">
      <div className="bg-white p-10 rounded-ls shadow-lg w-full max-w-md">
        <h2 className="text-center text-gray-800 mb-6 text-2xl font-semibold">
          Login
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-black text-white rounded-md text-lg font-semibold hover:bg-green-500 transition-all mt-4"
          >
            Entrar
          </button>
        </form>

        {errorMessage && (
          <p className="text-red-600 text-center mt-3 text-sm">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginRoute;
