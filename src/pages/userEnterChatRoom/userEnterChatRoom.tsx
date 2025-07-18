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
import { gameModeStatus } from '@api/roomStatus';
import { useEffect, useState } from 'react';
import useGameModeStore from '@store/useGameModeStore';
type GameMode = 'NORMAL' | 'TMI' | 'BALANCE';

interface ModeConfig {
  title: string;
  button: string;
}
const MODE_CONFIG: Record<GameMode, ModeConfig> = {
  NORMAL: {
    title: '키워드를 입력하러 가 볼까요?',
    button: '키워드 입력하러 가기',
  },
  TMI: {
    title: 'TMI를 입력하러 가 볼까요?',
    button: 'TMI 입력하러 가기',
  },
  BALANCE: {
    title: '밸런스 게임을 즐기러 가볼까요?',
    button: '밸런스 게임 시작하기',
  },
};

const UserEnterChatRoom = () => {
  const { nickname, isNicknameValid, handleNicknameChange } = useNicknameValidation();
  const { password, isPasswordValid, handlePasswordChange } = usePasswordValidation();
  const isFormValid = isNicknameValid === true && isPasswordValid === true;
  const [gamesMode, setGamesMode] = useState<GameMode | null>(null);
  const { roomKey } = useParams();
  const navigate = useNavigate();
  const prevRoomKey = useRoomUsersStore.getState().roomKey;
  const setRoomKey = useRoomUsersStore.getState().setRoomKey;
  const addUser = useRoomUsersStore((state) => state.addUser);
  const resetUsers = useRoomUsersStore((state) => state.resetUsers);
  const setUser = useRoomUsersStore((state) => state.setUser);
  const setGameMode = useGameModeStore.getState().setGameMode;

  const title = gamesMode ? MODE_CONFIG[gamesMode].title : '';
  const button = gamesMode ? MODE_CONFIG[gamesMode].button : '';

  useEffect(() => {
    console.log('현재 gameMode:', gamesMode);
  }, [gamesMode]);
  useEffect(() => {
    const fetchGameMode = async () => {
      if (!roomKey) return;
      try {
        const res = await gameModeStatus(roomKey);
        console.log(res);
        const modeFromApi = res.data.gameMode as GameMode;
        setGamesMode(modeFromApi);
        setGameMode(modeFromApi);

        console.log('API로 불러온 gameMode:', modeFromApi);
      } catch (error) {
        console.error('gameMode 불러오기 실패:', error);
      }
    };

    fetchGameMode();
  }, [roomKey]);

  const fetchCurrentStep = async () => {
    if (!roomKey || !gamesMode) return;

    try {
      // 게임 모드에 따른 API 엔드포인트 설정
      const res = await axios.get(`/api/${gamesMode.toLowerCase()}/rooms/${roomKey}/status`, {
        withCredentials: true,
      });
      if (res.data) {
        console.log('진행 상태:', res.data.data);
        return res.data.data.currentStep;
      }
    } catch (error) {
      console.error('Error fetching process rate:', error);
      navigate('/rooms/exit');
    }
  };

  const handleJoin = async () => {
    if (!roomKey) return;
    try {
      const res = await joinRoom(roomKey, { nickname, password });
      console.log(res);

      if (res.data.data.isLeader && roomKey !== prevRoomKey) {
        resetUsers(); // 새로운 방이면 초기화
      }
      setRoomKey(roomKey); // 무조건 현재 roomKey로 갱신

      const currentUsers = useRoomUsersStore.getState().users;
      const alreadyIn = currentUsers.some((user) => user.nickname === res.data.data.nickname);

      addUser(res.data.data);
      if (!alreadyIn) {
        setUser(res.data.data);
      }
      const updatedUsers = useRoomUsersStore.getState().users;
      console.log('전역 저장된 users:', updatedUsers);
      //TMI모드 방 참여
      if (gamesMode === 'TMI') {
        const currentStep = await fetchCurrentStep();
        if (currentStep === 'COLLECTING_TMI') {
          navigate(`/tmi/${roomKey}/input`);
        } else if (currentStep === 'HINT') {
          navigate(`/tmi/${roomKey}/load`);
        } else if (currentStep === 'VOTING') {
          navigate(`/tmi/${roomKey}/vote`, {
            state: { roomKey },
          });
        } else if (currentStep === 'COMPLETED') {
          // navigate(`/tmi/${roomKey}/result`);
        }
        return;
        // BALANCE모드 방 참여
      } else if (gamesMode === 'BALANCE') {
        const currentStep = await fetchCurrentStep();
        if (currentStep === 'WAITING_FOR_MEMBERS') {
          navigate(`/balance/${roomKey}/load`);
        } else if (currentStep === 'QUESTION_REVEAL') {
          navigate(`/balance/${roomKey}/question`);
        } else if (currentStep === 'DISCUSSION') {
          navigate(`/balance/${roomKey}/discussion`);
        } else if (currentStep === 'VOTING') {
          navigate(`/balance/${roomKey}/vote`);
        }
        return;
      }
      // NORMAL모드 방 참여
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
      <div>
        <UserEnterHeader>
          <TitleText>{title}</TitleText>
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
      </div>
      <ButtonContainer>
        <ButtonText>*닉네임과 비밀번호는 이번 채팅방에서만 사용돼요.</ButtonText>
        <Button onClick={handleJoin} text={button} active={isFormValid} />
      </ButtonContainer>
    </UserEnterContainer>
  );
};

export default UserEnterChatRoom;

const UserEnterContainer = styled(Container)`
  padding-top: 80px;
  justify-content: space-between;
  box-sizing: border-box;
  padding-bottom: 24px;
`;
const UserEnterHeader = styled(Header)`
  margin-bottom: 55px;
`;
const TitleText = styled(Title)`
  color: #3e3333;
  text-align: center;
`;
const SubTitleText = styled(SubTitle)`
  color: #7c7c7c;
`;

const ButtonContainer = styled(Container)`
  gap: 13px;
  min-height: 50px;
`;
const ButtonText = styled.p`
  color: #b7b7b7;
  font-size: 10px;
  font-weight: 500;
  text-align: center;
`;
