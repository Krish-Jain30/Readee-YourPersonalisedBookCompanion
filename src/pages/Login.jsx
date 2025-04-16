import { Card } from "@/components/ui/card";
import { Button, Input } from "@headlessui/react";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";
import LoginImage from "../assets/LoginImage.jpg"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#1a1a1a]">
        <Card className="p-6 w-96 bg-[#2a2a2a]">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#fef1e1]">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <Label htmlFor="email" className="block text-[#fef1e1]">Email</Label>
              <Input
                type="email"
                id="email"
                className="mt-2 block w-full p-2 border text-[#fef1e1] border-[#fef1e1] focus:ring-2 focus:ring-[#fef1e1]"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="password" className="block text-[#fef1e1]">Password</Label>
              <Input
                type="password"
                id="password"
                className="mt-2 block w-full p-2 border text-[#fef1e1] border-[#fef1e1] focus:ring-2 focus:ring-[#fef1e1]"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#fc350b] border-2 border-[#fc350b] text-[#fef1e1] py-2 hover:bg-[#1a1a1a] hover:text-[#fef1e1]"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-[#fef1e1]">
              Don't have an account?{" "}
              <a href="/signup" className="text-[#fc350b] hover:underline">
                Sign Up
              </a>
            </span>
          </div>
        </Card>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${LoginImage})` }}></div>
    </div>
  );
};

export default Login;
