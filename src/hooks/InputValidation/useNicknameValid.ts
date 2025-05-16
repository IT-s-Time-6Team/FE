import { useState } from 'react';

const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;

const useNicknameValidation = () => {
  const [nickname, setNickname] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);

  const handleNicknameChange = (value: string) => {
    setNickname(value);

    if (value.trim() === '') {
      setIsNicknameValid(null);
      return;
    }
    const isLengthValid = value.trim().length >= 1;
    const isContentValid = nicknameRegex.test(value);
    setIsNicknameValid(isLengthValid && isContentValid);
  };
  return {
    nickname,
    isNicknameValid,
    handleNicknameChange,
  };
};

export default useNicknameValidation;
