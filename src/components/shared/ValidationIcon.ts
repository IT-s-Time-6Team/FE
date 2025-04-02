import styled from '@emotion/styled';
import { css } from '@emotion/react';
import XMark from '@assets/XMark.svg?react';
import CheckMark from '@assets/WhiteCheck.svg?react';

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
