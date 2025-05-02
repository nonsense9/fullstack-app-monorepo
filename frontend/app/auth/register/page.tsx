"use client"
import Link from "next/link";
import { useState } from "react";
import { useAuth, User } from "@/hooks/useAuth";


export default function Register() {
  const { register } = useAuth();
  const [ formState, setFormState ] = useState<Omit<User, "id">>({
    email: "",
    password: ""
  })
  
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      register(formState).then((r) => {
        if (r.status) {}
      }).catch(err => console.log(err));
      
    } catch (err) {
      console.log(err)
    }
    
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const validateForm = () => {
    
    const newErrors: User | {} = {};
    
    if (!formState.email) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Неверный формат email";
    }
    
    if (!formState.password) {
      newErrors.password = "Пароль обязателен";
    } else if (formState.password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
    }
    
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const [ errors, setErrors ] = useState({});
  return (
    <form className="mx-auto max-w-2xl w-full px-4 py-8" onSubmit={ (e) => handleSubmit(e) }>
      <div className="mb-5">
        <Link
          className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          href="/auth/login">To Login</Link>
      </div>
      
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
          
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
            
            <div className="sm:col-span-4">
              <label htmlFor="email"
                     className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={ handleChange }
                  defaultValue={ formState.email ? formState.email : "" }
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="password"
                     className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  onChange={ handleChange }
                  defaultValue={ formState.password ? formState.password : "" }
                  id="password"
                  name="password"
                  type="text"
                  autoComplete="password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button"
                className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}

