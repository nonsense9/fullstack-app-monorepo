import { useState, FormEvent } from 'react';
import { useAuth, User } from "@/hooks/useAuth";
import { ErrorHandler } from "@/utils/errorHandler";


type ValidationErrors = {
  [key in keyof User]?: string;
};

interface UseAuthFormProps {
  endpoint: string;
  initialValues?: Partial<User>;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useAuthForm = ({
                              endpoint,
                              initialValues = {},
                              onSuccess,
                              onError,
                            }: UseAuthFormProps) => {
  const { register, login } = useAuth();
  const [ formData, setFormData ] = useState<Partial<User>>({
    email: '',
    password: '',
    name: '',
    ...initialValues,
  });
  const [ touched, setTouched ] = useState<Record<string, boolean>>({
    email: false,
    password: false
  });
  
  const [ errors, setErrors ] = useState<ValidationErrors>({});
  const [ isLoading, setIsLoading ] = useState(false);
  
  const validateForm = () => {
    const newErrors: User = {};
    let isValid = true;
    
    if (!formData.email) {
      newErrors.email = 'Email required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Wrong email format';
      isValid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'Password required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  
  const resetForm = () => {
    setFormData(initialValues)
  }
  const shouldShowError = (fieldName: string) => {
    return touched[fieldName] && errors[fieldName];
  };
  
  const validateField = (name: string, value: string) => {
    let error = '';
    
    if (touched[name]) {
      switch (name) {
        case 'email':
          if (!value) {
            error = 'Email required';
          } else if (!/\S+@\S+\.\S+/.test(value)) {
            error = 'Wrong email format';
          }
          break;
        case 'password':
          if (!value) {
            error = 'Password required';
          } else if (value.length < 6) {
            error = 'Password must be at least 6 characters';
          }
          break;
      }
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    setTouched(prev => {
      return { ...prev, [name]: true };
    });
  };
  
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allTouched = Object.keys(formData).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setTouched(allTouched);
    
    if (!validateForm()) return;
    try {
      if (endpoint === "auth/register") {
        let { status, data } = await register(formData)
        if (status) {
          alert(`User for email ${ data.email } was created with ID: ${ data.id }`);
          
        }
      } else {
        let { status, data } = await login(formData)
        console.log(data)
        
        if (status) {
          alert(`Success on login with user for email ${ data.email } with ID: ${ data.id }`);
        }
      }
      resetForm()
      setTouched({
        email: false,
        password: false,
      });
    } catch (err) {
      const { message } = ErrorHandler.handleApiError(err);
      alert(message)
    }
  }
  
  return {
    formData,
    errors,
    isLoading,
    touched,
    shouldShowError,
    handleChange,
    handleSubmit,
    setFormData,
    validateForm,
    validateField,
  };
};
