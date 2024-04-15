/* eslint-disable no-unused-vars */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { api } from "../utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/user/login", { email, password }).then((res) => {
      if (!res.token) {
        alert(res.msg);
      } else {
        alert(res.msg);
        navigate("/dashboard");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            Sign In
          </h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-red-500 text-red-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Your Email"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-red-500 text-red-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Your Password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-red-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-red-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <NavLink
                to="/"
                className="font-medium text-red-600 hover:text-red-500"
              >
                Forgot your password?
              </NavLink>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
