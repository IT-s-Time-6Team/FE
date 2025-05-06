import styled from '@emotion/styled';

export const PeopleCount = styled.div`
  display: flex;
  font-weight: 300;
`;
export const CharacterImg = styled.img`
  position: absolute;
`;
export const ChatInput = styled.textarea`
  width: 80%;
  border: none;
  font-size: 14px;
`;
export const SendButton = styled.button<{ isInput: boolean }>`
  background-color: transparent;
  color: ${(props) => (props.isInput ? '#ff7913' : '#dadada')};
  height: 35px;
  svg {
    width: 35px;
    height: 35px;
    transition: color 0.1s ease;
  }
  &:hover {
    color: #ff7913;
  }
`;
export const ChatInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  border: none;
  border-top: 1px solid #e4e4e4;
  width: 100%;
  height: 125px;
  padding: 19px 24px;
  display: flex;
  justify-content: space-between;
  background-color: white;
`;
export const UserEntry = styled.div`
  background-color: #f0f0f066;
  margin: 30px auto;
  padding: 10px 22px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  color: #7c7c7c;
`;
export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const KeyWordDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #f0f0f0;
  margin: 11px 0;
`;
export const KeyWordDetail = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #7c7c7c;
  margin-top: 8px;
`;
export const KeyWordContainer = styled.div`
  border: 1px solid #e4e4e4;
  width: 342px;
  height: content-fit;
  border-radius: 12px;
  padding: 18px 22px;
`;
export const KeyWord = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: #3e3333;
`;
export const Logo = styled.div`
  font-weight: bold;
  color: #333;
  font-size: 16px;
`;
export const CloseButton = styled.button`
  background-color: #bcbcbc26;
  color: #3e3333;
  width: 52px;
  height: 32px;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 16px;
`;
export const CharactersContainer = styled.div`
  background-color: #f1f1f1;
  width: 175px;
  height: 175px;
  border-radius: 50%;
  margin: 0 auto;
  margin-bottom: 30px;
  position: relative;
`;
export const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100dvw;
  height: calc(100dvh - 124px);
  padding: 24px;
  background-color: rgb(255, 255, 255);
  gap: 11px;
  overflow: auto;
`;
export const ChatRoomHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  width: 100%;
  font-size: 16px;
`;
