import Button from '@components/chatRoomCreated/LoginButton';
import styled from '@emotion/styled';
import { Container, Header } from './UIStyles';
import { SubTitle, Title } from './TextStyles';

export const Box = styled(Container)`
  width: 287px;
  min-height: 343px;
  gap: 15px;
  border-radius: 18px;
  border: 1px solid #e4e4e4;
`;

export const BoxHeader = styled(Header)`
  margin: 0 26px;
  gap: 15px;
  border-bottom: 1px solid #e4e4e4;
  text-align: center;
`;

export const BoxTitle = styled(Title)`
  margin-top: 21px;
`;

export const BoxSubTitle = styled(SubTitle)`
  padding: 0px 40px;
  margin-bottom: 15px;
  font-size: 12px;
  line-height: 140%;
`;

export const BoxSelector = styled(Container)`
  margin-top: 9px;
  gap: 17px;
  min-height: 90px;
`;

export const BoxComplete = styled(Button)`
  position: absolute;
  bottom: 18px;
  width: 253px;
  height: 57px;
`;
