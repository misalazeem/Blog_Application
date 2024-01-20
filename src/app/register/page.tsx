"use client"

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/authApi";
import Input from "@/app/components/Input/Input";
import Button from "../components/Button/Button";

interface RegisterFormProps {
  username: string;
  name: string;
  email: string;
  password: string;
}

const RegisterForm: RegisterFormProps = {
  username: "",
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useState(RegisterForm);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: any) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    setErrorMessage(null);
  };

  const validateForm = () => {
    if (!registerForm.username || !registerForm.name || !registerForm.email || !registerForm.password) {
      setErrorMessage("All fields are required.");
      return false;
    }

    if (registerForm.username.length < 5 || registerForm.name.length < 5 || registerForm.password.length < 5) {
      setErrorMessage("Username, password and Name must have a minimum of 5 characters.");
      return false;
    }

    return true;
  };

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await register(registerForm);

        if (response) {
          setTimeout(() => {
            router.push('/login');
          });
        } else {
          setErrorMessage("Username or email already taken");
        }
      } catch (error) {
        console.error("Registration failed:", error);
        setErrorMessage("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <form className="text-center" onSubmit={submitForm}>
      <div className="flex flex-col w-[50%] justify-center mx-auto gap-2">
        <Input
          placeholder="Name"
          id="name"
          type="text"
          onChange={handleChange}
          value={registerForm.name}
          name="name"
        />
        <Input
          placeholder="Email"
          id="email"
          type="email"
          onChange={handleChange}
          value={registerForm.email}
          name="email"
        />
        <Input
          placeholder="Username"
          id="username"
          type="text"
          onChange={handleChange}
          value={registerForm.username}
          name="username"
        />
        <Input
          placeholder="Password"
          id="password"
          type="password"
          onChange={handleChange}
          value={registerForm.password}
          name="password"
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Button type="submit" customStyles="bg-blue-500 hover:bg-blue-600">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Register;
