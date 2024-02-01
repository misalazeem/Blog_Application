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
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
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
          setSuccessMessage('Login Successful!');
          setTimeout(() => {
            //router.push('/');
            location.reload();
          }, 2500);
        } else if (callback?.error) {
        throw new Error('Wrong Credentials');
        }
    } catch (error) {
        setErrorMessage(`${error}`);
    }
    };

  
    return (
      <>
        <form className="text-center" onSubmit={submitForm}>
          <div className="flex flex-col p-8 w-[90%] justify-center mx-auto gap-2">
            <h3 className="text-2xl mb-6 font-bold">Log In Your Account</h3>
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
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="items-center mt-4">
              <Button type="submit" customStyles="bg-black w-[50%] hover:bg-gray-800">Submit</Button>
            </div>
          </div>
        </form>
      </>
    );
  };
  
  export default Login;
