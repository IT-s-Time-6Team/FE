import styled from '@emotion/styled';
import { Container, Header } from '@components/shared/UIStyles';
import { Title, SubTitle } from '@components/shared/TextStyles';
import useNicknameValidation from '@hooks/InputValidation/useNicknameValid';
import usePasswordValidation from '@hooks/InputValidation/usePasswordValid';
import {
  LoginContainer,
  LoginForm,
  InputContainer,
  InputLabel,
  NicknameInput,
  PasswordInput,
  CircleIcon,
  CheckIcon,
  XMarkIcon,
} from '@components/shared/LoginFormStyle';
import ValidationMessage from '@components/chatRoomCreated/ValidationMessage';
import Button from '@components/chatRoomCreated/LoginButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { joinRoom } from '@api/login';
import useRoomUsersStore from '@store/useRoomUsersStore';

const UserEnterChatRoom = () => {
  const { nickname, isNicknameValid, handleNicknameChange } = useNicknameValidation();
  const { password, isPasswordValid, handlePasswordChange } = usePasswordValidation();
  const isFormValid = isNicknameValid === true && isPasswordValid === true;

  const { roomKey } = useParams();
  const navigate = useNavigate();
  const addUser = useRoomUsersStore((state) => state.addUser);
  const resetUsers = useRoomUsersStore((state) => state.resetUsers);

  const handleJoin = async () => {
    if (!roomKey) return;
    try {
      const res = await joinRoom(roomKey, { nickname, password });
      console.log(res);
      if (res.data.data.isLeader) {
        resetUsers();
      }
      addUser(res.data.data);
      const updatedUsers = useRoomUsersStore.getState().users;
      console.log('전역 저장된 users:', updatedUsers);

      navigate(`/rooms/${roomKey}/chat`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const { status, data } = err.response || {};
        const errorCode = data?.code;
        const errorMessage = data?.data;

        switch (true) {
          case status === 403:
            alert('중복된 닉네임입니다. 다른 닉네임을 입력해주세요!');
            break;

          case errorCode === 400:
            alert(errorMessage || '요청이 잘못되었습니다.');
            break;

          default:
            alert('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
            break;
        }
      } else {
        console.error(err);
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <UserEnterContainer>
      <UserEnterHeader>
        <TitleText>키워드를 입력하러 가 볼까요?</TitleText>
        <SubTitleText>사용할 닉네임과 비밀번호를 입력해주세요</SubTitleText>
      </UserEnterHeader>
      <LoginContainer>
        <LoginForm>
          <InputContainer>
            <InputLabel>
              닉네임
              <NicknameInput
                type='text'
                name='nickname'
                value={nickname}
                $valid={isNicknameValid}
                onChange={(e) => handleNicknameChange(e.target.value)}
                placeholder='채팅방에서 사용할 닉네임을 입력해주세요.'
                autoComplete='on'
                required
              />
              <CircleIcon $valid={isNicknameValid} />
              <CheckIcon $show={isNicknameValid === true} />
              <XMarkIcon $show={isNicknameValid === false} />
            </InputLabel>
            <ValidationMessage valid={isNicknameValid} type='nickname' />
          </InputContainer>

          <InputContainer>
            <InputLabel>
              비밀번호
              <PasswordInput
                type='password'
                name='password'
                value={password}
                $valid={isPasswordValid}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder='채팅방에서 사용할 비밀번호를 입력해 주세요.'
                autoComplete='current-password'
                required
              />
              <CircleIcon $valid={isPasswordValid} />
              <CheckIcon $show={isPasswordValid === true} />
              <XMarkIcon $show={isPasswordValid === false} />
            </InputLabel>
            <ValidationMessage valid={isPasswordValid} type='password' />
          </InputContainer>
        </LoginForm>
      </LoginContainer>
      <ButtonContainer>
        <ButtonText>*닉네임과 비밀번호는 이번 채팅방에서만 사용돼요.</ButtonText>
        <EntranceButton onClick={handleJoin} text='키워드 입력하러 가기' active={isFormValid} />
      </ButtonContainer>
    </UserEnterContainer>
  );
};

export default UserEnterChatRoom;

const UserEnterContainer = styled(Container)`
  margin-top: 97px;
  gap: 59px;
`;
const UserEnterHeader = styled(Header)``;
const TitleText = styled(Title)`
  color: #3e3333;
  text-align: center;
`;
const SubTitleText = styled(SubTitle)`
  color: #7c7c7c;
`;

const ButtonContainer = styled(Container)`
  margin-top: 244px;
  gap: 13px;
`;
const ButtonText = styled.p`
  color: #b7b7b7;
  font-size: 10px;
  font-weight: 500;
  text-align: center;
`;
const EntranceButton = styled(Button)`
  position: absolute;
  bottom: 47px;
`;
