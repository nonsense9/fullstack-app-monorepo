import { useState, useEffect, FocusEventHandler } from 'react';
import { useAuth, User } from "@/hooks/useAuth";
import { ErrorHandler } from "@/utils/errorHandler";
import { useNotification } from "@/context/NotificationContext";


type ValidationErrors = {
  [key in keyof User]?: string;
};

type TouchedFields = {
  [key in keyof User]?: boolean;
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
                              onError
                            }: UseAuthFormProps) => {
  const { register, login } = useAuth();
  const { handleNotification } = useNotification();
  
  const [ formData, setFormData ] = useState<Partial<User>>({
    email: '',
    password: '',
    name: '',
    ...initialValues,
  });
  const [ touched, setTouched ] = useState<TouchedFields>({});
  const [ errors, setErrors ] = useState<ValidationErrors>({});
  const [ isLoading, setIsLoading ] = useState(false);
  
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
    return error;
  };
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    setTouched(prev => ({ ...prev, [name]: true }));
  };
  
  const handleSuccess = (data: Partial<User>) => {
    const message = endpoint === "auth/register"
      ? `User for email ${ data.email } was created with ID: ${ data.id }`
      : `Success on login with user for email ${ data.email } with ID: ${ data.id }`;
    
    handleNotification(message, 'success');
    resetForm();
    setTouched({
      email: false,
      password: false,
    });
    
    if (onSuccess) onSuccess(data);
  };
  
  const handleError = (err: any) => {
    const { message } = ErrorHandler.handleApiError(err);
    handleNotification(message, 'error');
    
    if (onError) onError(err);
  };
  
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allTouched = Object.keys(formData).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setTouched(allTouched);
    
    try {
      if (endpoint === "auth/register") {
        let { status, data } = await register(formData)
        if (status) {
          handleSuccess(data);
        }
      } else {
        let { status, data } = await login(formData)
        if (status) {
          handleSuccess(data);
        }
      }
      resetForm()
      setTouched({
        email: false,
        password: false,
      });
    } catch (err) {
      handleError(err);
    }
  }
  
  const handleBlur = (e: FocusEventHandler<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  };
  
  useEffect(() => {
    Object.keys(touched).forEach(field => {
      if (touched[field as keyof User]) {
        const error = validateField(field as keyof User, formData[field]);
        setErrors(prev => ({
          ...prev,
          [field]: error,
        }));
      }
    });
  }, [ touched, formData ]);
  
  return {
    formData,
    errors,
    isLoading,
    touched,
    shouldShowError,
    handleChange,
    handleSubmit,
    handleBlur,
    setFormData,
    validateField,
  };
};
