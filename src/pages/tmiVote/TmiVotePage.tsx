import questionIcon from '@assets/v2/questionBubble.svg';
import { ChatRoomContainer, ChatRoomHeader, CloseButton } from '../../styles/chatRoom/chatRoom';
import { Header } from '@components/shared/UIStyles';
import InfoIcon from '@assets/chatRoom/info.svg';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ModalPortal } from '@components/shared/ModalPortal';
import InviteModal from '@components/chatRoom/InviteModal';
import { Title, SubTitle } from '@components/shared/TextStyles';
import styled from '@emotion/styled';
import searchIcon from '@assets/v2/search.svg';
import Button from '@components/shared/Button';
import { getVoteInfo } from '@api/voteInfo';
import axios from 'axios';
type VoteInfo = {
  tmiContent: string;
  round: number;
  members: string[];
};
const MAX_NICKNAME_LENGTH = 3;
const TmiVotePage = () => {
  const [isInviteOpen, setIsInviteOpen] = useState<boolean>(false);
  const [selectedMemberName, setSelectedMemberName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [voteInfo, setVoteInfo] = useState<VoteInfo | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const roomKey = location.state?.roomKey;

  const filteredNicknames = useMemo(() => {
    return (
      voteInfo?.members.filter((nickname) =>
        nickname.toLowerCase().includes(searchQuery.toLowerCase()),
      ) || []
    );
  }, [voteInfo, searchQuery]);

  useEffect(() => {
    if (roomKey) {
      getVoteInfo(roomKey)
        .then((res) => setVoteInfo(res.data))
        .catch(() => setVoteInfo(null));
    }
    console.log(roomKey);
  }, [roomKey]);

  const handleSubmit = async () => {
    if (!roomKey) {
      console.error('Room key is not defined');
      return;
    }
    if (!roomKey || !selectedMemberName) {
      alert('투표할 멤버를 선택해주세요.');
      return;
    }

    try {
      const res = await axios.post(
        `/api/tmi/rooms/${roomKey}/votes`,
        {
          votedMemberName: selectedMemberName,
        },
        {
          withCredentials: true,
        },
      );
      console.log('TMI 투표 제출 성공:', res);
      navigate(`/tmi/${roomKey}/voting`, {
        state: { roomKey },
      });
    } catch (error: unknown) {
      console.error('error: ', error);
      throw error;
    }
  };
  return (
    <VoteRoomContainer>
      <ChatRoomHeader>
        <InfoButton onClick={() => setIsInviteOpen(true)} src={InfoIcon} alt='info' />
        <CloseButton>종료</CloseButton>
      </ChatRoomHeader>
      <VoteBox>
        <Header>
          <Title>누구의 TMI일까?</Title>
          <SubTitle>누가 TMI를 말했을지 맞춰보세요!</SubTitle>
        </Header>
        <img src={questionIcon} />
        <GrayBox>
          <TmiText>{voteInfo?.tmiContent}</TmiText>
        </GrayBox>
        <VoteBox gap='10px'>
          <TmiText>TMI의 주인은 누구일까요?</TmiText>
          <SearchBox>
            <Input
              placeholder='닉네임 검색하기'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img src={searchIcon} />
          </SearchBox>
          <NicknameBox>
            {filteredNicknames?.map((item, idx) => (
              <Nickname
                key={idx}
                isSelected={selectedMemberName === item}
                onClick={() => setSelectedMemberName(item)}
              >
                <PersonText isClicked={selectedMemberName === item}>
                  {item.length > 3 ? `${item.slice(0, MAX_NICKNAME_LENGTH)}...` : item}
                </PersonText>
              </Nickname>
            ))}
          </NicknameBox>
        </VoteBox>
      </VoteBox>
      <Button text='투표하기' onClick={handleSubmit} />
      {isInviteOpen && (
        <ModalPortal>
          <InviteModal onClose={() => setIsInviteOpen(false)} roomId='sdfs3' />
        </ModalPortal>
      )}
    </VoteRoomContainer>
  );
};
export default TmiVotePage;
const VoteRoomContainer = styled(ChatRoomContainer)`
  justify-content: space-between;
`;
const VoteBox = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ gap }) => gap || '20px'};
`;

const InfoButton = styled.img`
  width: 24px;
  min-height: 24px;
  cursor: pointer;
`;
const TmiText = styled(SubTitle)`
  color: '#ffffff';
  text-align: center;
  line-height: 150%;
`;
const PersonText = styled(TmiText)<{ isClicked: boolean }>`
  color: ${({ isClicked }) => (isClicked ? '#ffffff' : '#3e3333')};
`;

const GrayBox = styled.div`
  width: 300px;
  background-color: #f9f9f9;
  padding: 19px 24px;
  border-radius: 12px;
`;
const SearchBox = styled.div`
  width: 297px;
  height: 41px;
  padding: 10px 13px;
  border-radius: 8px;
  background: #f9f9f9;
  box-sizing: border-box;
  outline: none;
  border: none;
  display: flex;
  justify-content: space-between;
`;
const Input = styled.input`
  border: none;
  outline: none;
  background: #f9f9f9;
  width: 90%;
`;
const NicknameBox = styled.div`
  width: 300px;
  height: 134px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 9px;
  overflow-y: auto;
  align-items: flex-start;
`;
const Nickname = styled.div<{ isSelected: boolean }>`
  width: 93px;
  height: 41px;
  padding: 10px 15px;
  box-sizing: boreder-box;
  border-radius: 8px;
  background-color: ${({ isSelected }) => (isSelected ? '#FF7913' : '#EBEBEB')};
`;
