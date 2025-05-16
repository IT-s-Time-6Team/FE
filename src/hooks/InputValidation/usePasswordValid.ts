import { useState } from 'react';

const passwordRegex = /^(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

const usePasswordValidation = () => {
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (value.trim() === '') {
      setIsPasswordValid(null);
      return;
    }

    const isValidPassword = passwordRegex.test(value);
    setIsPasswordValid(isValidPassword);
  };

  return {
    password,
    isPasswordValid,
    handlePasswordChange,
  };
};

export default usePasswordValidation;
