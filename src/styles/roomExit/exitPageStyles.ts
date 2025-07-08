import styled from '@emotion/styled';
import { Title } from '@components/shared/TextStyles';
import DownloadIcon from '@assets/DownloadIcon.svg?react';
import { Container, Header } from '@components/shared/UIStyles';
export const ResultText = styled(Title)`
  font-size: 19px;
`;
export const SummaryHeader = styled(Header)`
  margin-top: 30px;
`;
export const StatsContainer = styled.div`
  width: 342px;
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const FeedbackText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #7c7c7c;
  text-align: center;
`;
export const FormLinkText = styled.a`
  font-size: 14px;
  font-weight: 400;
  color: #7c7c7c;
  text-align: center;
`;
export const MainText = styled.p`
  font-size: 15px;
  font-weight: 500;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 342px;
  min-height: 376px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  padding: 33px 0;
  margin-top: 25px;
`;
export const Wrapper = styled.div`
  display: flex;
  width: 299px;
  min-height: 55px;
  flex-direction: column;
  align-items: flex-start;
`;
export const Divider = styled.div`
  width: 299px;
  height: 1px;
  background-color: #f0f0f0;
  margin: 6px 0;
`;
export const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;
export const SaveWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: flex-end;
  cursor: pointer;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const SaveText = styled.p`
  color: #7c7c7c;
  font-size: 12px;
  font-weight: 500;
  margin: 10px 0;
`;
export const FeedbackBox = styled.div`
  width: 299px;
  height: 78px;
  border-radius: 12px;
  background: rgba(240, 240, 240, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: center;
  padding: 20px 0;
  box-sizing: border-box;
  margin-top: 20px;
  margin-bottom: 40px;
`;
export const Download = styled(DownloadIcon)`
  width: 20px;
  height: 20px;
`;
export const ProfileImage = styled.img`
  margin-top: 150px;
  margin-bottom: 23px;
  justify-self: center;
`;
export const ExpiryContainer = styled(Container)`
  justify-content: space-between;
`;
export const ExpiryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
