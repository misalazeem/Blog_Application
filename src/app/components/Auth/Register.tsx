"use client"

import React, { FormEvent, useState } from "react";
import { register } from "@/lib/authApi";
import Input from "@/app/components/Input/Input";
import Button from "../Button/Button";

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
  const [registerForm, setRegisterForm] = useState(RegisterForm);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: any) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    setErrorMessage(null);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const hasMinimumLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: hasMinimumLength && hasUpperCase && hasSpecialCharacter,
      hasMinimumLength,
      hasUpperCase,
      hasSpecialCharacter,
    };
  };

  const validateForm = () => {
    if (!registerForm.username || !registerForm.name || !registerForm.email || !registerForm.password) {
      setErrorMessage("All fields are required.");
      return false;
    }

    if (!validateEmail(registerForm.email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    if (!validatePassword(registerForm.password).isValid) {
      setErrorMessage("Please enter a valid password.");
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
        setRegisterForm(RegisterForm);
        if (response) {
            setSuccessMessage('Registeration Successful!');
            
            if (typeof window !== 'undefined') {
              setTimeout(() => {
                location.reload();
              }, 2500);
            }
        } else {
          setErrorMessage("Username or email already taken");
        }
      } catch (error) {
        console.error("Registration failed:", error);
        setErrorMessage("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const passwordValidation = validatePassword(registerForm.password);

  return (
    <form className="text-center" onSubmit={submitForm}>
      <div className="flex flex-col p-8 justify-center mx-auto gap-2">
        <h3 className="text-2xl mb-6 font-bold">Create an Account</h3>
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
       {registerForm.password && <div className="flex flex-col items-center gap-2">
          <div className="flex flex-row gap-2 justify-between">
            {passwordValidation.hasMinimumLength ? (
              <>
                <span className="text-green-500">&#10003;</span>
                <p className="text-green-500">Password must have at least 8 characters</p>
              </>
            ) : (
              <>
                <span className="text-red-500">&#10007;</span>
                <p className="text-red-500">Password must have at least 8 characters</p>
              </>
            )}
          </div>
          <div className="flex flex-row gap-2 justify-between">          
            {passwordValidation.hasUpperCase ? (
              <>
                <span className="text-green-500">&#10003;</span>
                <p className="text-green-500">Password must have an uppercase character</p>
              </>
            ) : (
              <>
                <span className="text-red-500">&#10007;</span>
                <p className="text-red-500">Password must have an uppercase character</p>
              </>
            )}            
          </div>
          <div className="flex flex-row gap-2 justify-between">            
            {passwordValidation.hasSpecialCharacter ? (
              <>
                <span className="text-green-500">&#10003;</span>
                <p className="text-green-500">Password must have a special characterr</p>
              </>
            ) : (
              <>
                <span className="text-red-500">&#10007;</span>
                <p className="text-red-500">Password must have a special characterr</p>
              </>
            )}            
          </div>
        </div>
        }
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="items-center mt-2">
          <Button type="submit" customStyles="bg-black w-[40%] hover:bg-gray-800">
            Submit
          </Button>
        </div>
        </div>
    </form>
  );
};

export default Register;
