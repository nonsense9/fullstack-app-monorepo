"use client"
import Link from "next/link";
import { useAuthForm } from "@/hooks/useAuthForm";
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  
  const {
    formData,
    errors,
    shouldShowError,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useAuthForm({
    endpoint: 'auth/login',
    onSuccess: (data) => {
      router.push('/');
    },
    onError: (error) => {
      console.error('Login error', error);
    }
  });
  
  return (
    <div className="flex min-h-full h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6" onSubmit={ (e) => handleSubmit(e) }>
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={ handleChange }
                onBlur={ handleBlur }
                value={ formData.email ? formData.email : "" }
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              { shouldShowError('email') && (
                <small className="text-red-500">{ errors.email }</small>
              ) }
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <Link className="font-semibold text-indigo-600 hover:text-indigo-500" href="/auth/register">
                  Don't have an account yet?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                onChange={ handleChange }
                onBlur={ handleBlur }
                value={ formData.password ? formData.password : "" }
                id="password"
                name="password"
                type="password"
                required
                autoComplete="password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              { shouldShowError('password') && (
                <small className="text-red-500">{ errors.password }</small>
              ) }
            </div>
          </div>
          
          <div className="flex justify-between">
            <Link type="button"
                  className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  href="/auth/login"
            >
              Back
            </Link>
            <button
              type="submit"
              disabled={ errors.email || errors.password }
              className={ `${ errors.email || errors.password ? 'opacity-50' : '' } justify-center rounded-full bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600` }
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

