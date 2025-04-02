import styled from '@emotion/styled';
import { css } from '@emotion/react';
import XMark from '@assets/XMark.svg?react';
import CheckMark from '@assets/WhiteCheck.svg?react';

export const LoginContainer = styled.div`
  width: 273px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;

  color: #3e3333;
  font-size: 16px;
  font-weight: 600;
`;

export const NicknameInput = styled.input<{ $valid: boolean | null }>`
  margin-bottom: 12px;
  padding-right: 35px;
  padding-bottom: 13px;

  border: none;
  border-bottom: 1px solid
    ${({ $valid }) => ($valid === true ? '#87E543' : $valid === false ? '#FF7676' : '#f0f0f0')};
  transition: border-color 0.2s ease;

  outline: none;
  &::placeholder {
    color: #b7b7b7;
    font-size: 12px;
    font-weight: 500;
  }
`;

export const NicknameText = styled.p`
  color: #b7b7b7;
  font-size: 10px;
  font-weight: 500;
`;
export const PasswordInput = styled(NicknameInput)``;
export const PasswordText = styled(NicknameText)``;

const iconBaseStyle = css`
  width: 9px;
  height: 9px;

  position: absolute;
  top: 36px;
  right: 10px;

  transform: translate(50%, -50%);
  transition: opacity 0.2s ease;
`;

export const CircleIcon = styled.span<{ $valid: boolean | null }>`
  width: 19px;
  height: 19px;
  border-radius: 100%;

  position: absolute;
  top: 36px;
  right: 10px;

  transform: translate(50%, -50%);
  transition:
    background-color 0.2s ease,
    opacity 0.2s ease;

  ${({ $valid }) =>
    $valid === true
      ? css`
          background-color: #87e543;
          opacity: 1;
          visibility: visible;
        `
      : $valid === false
        ? css`
            background-color: #ff7676;
            opacity: 1;
            visibility: visible;
          `
        : css`
            opacity: 0;
            visibility: hidden;
          `}
`;

export const CheckIcon = styled(CheckMark, {
  shouldForwardProp: (prop) => prop !== '$show',
})<{ $show: boolean }>`
  ${iconBaseStyle};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  visibility: ${({ $show }) => ($show ? 'visible' : 'hidden')};
`;

export const XMarkIcon = styled(XMark, {
  shouldForwardProp: (prop) => prop !== '$show',
})<{ $show: boolean }>`
  ${iconBaseStyle};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  visibility: ${({ $show }) => ($show ? 'visible' : 'hidden')};
`;
