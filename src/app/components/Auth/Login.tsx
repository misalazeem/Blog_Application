'use client'

import Input from "@/app/components/Input/Input";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

interface LoginFormProps {
  username: string,
  password: string
}

const initialLoginForm:LoginFormProps = {
  username: '',
  password: ''
}

const Login = () => {
    const router = useRouter();
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
    const handleChange = (e: any) => {
      setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
      setErrorMessage(null);
    };
  
    const validateForm = () => {
      if (!loginForm.username || !loginForm.password) {
        setErrorMessage("All fields are required.");
        return false;
      }
  
      if (loginForm.username.length < 5 || loginForm.password.length < 5) {
        setErrorMessage("Username and password must have a minimum of 5 characters.");
        return false;
      }
  
      return true;
    };
  
    const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    try {
        const callback = await signIn('credentials', {
        ...loginForm,
        redirect: false,
        });
        if (callback?.ok) {
        router.push('/');
        } else if (callback?.error) {
        throw new Error('Wrong Credentials');
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        setErrorMessage('An error occurred during authentication.');
    }
    };

  
    return (
      <form className="text-center" onSubmit={submitForm}>
        <div className="flex flex-col w-[90%] justify-center mx-auto gap-2">
          <Input
            placeholder='Username'
            id='username'
            type='text'
            onChange={handleChange}
            value={loginForm.username}
            name="username"
          />
          <Input
            placeholder='Password'
            id='password'
            type='password'
            onChange={handleChange}
            value={loginForm.password}
            name="password"
          />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <Button type="submit" customStyles="bg-blue-500 hover:bg-blue-600">Submit</Button>
        </div>
      </form>
    );
  };
  
  export default Login;
