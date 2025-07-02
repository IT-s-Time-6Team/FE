import questionIcon from '@assets/v2/questionBubble.svg';
import { ChatRoomContainer, ChatRoomHeader, CloseButton } from '../../styles/chatRoom/chatRoom';
import { Header } from '@components/shared/UIStyles';
import InfoIcon from '@assets/chatRoom/info.svg';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ModalPortal } from '@components/shared/ModalPortal';
import InviteModal from '@components/chatRoom/InviteModal';
import { Title, SubTitle } from '@components/shared/TextStyles';
import styled from '@emotion/styled';
import searchIcon from '@assets/v2/search.svg';
import Button from '@components/shared/Button';
import { getVoteInfo } from '@api/voteInfo';

type VoteInfo = {
  tmiContent: string;
  round: number;
  members: string[];
};

const TmiVotePage = () => {
  const [isInviteOpen, setIsInviteOpen] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [voteInfo, setVoteInfo] = useState<VoteInfo | null | undefined>();
  const navigate = useNavigate();
  const location = useLocation();
  const roomKey = location.state?.roomKey;

  const filteredNicknames = voteInfo?.members.filter((nickname) =>
    nickname.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    if (roomKey) {
      getVoteInfo(roomKey)
        .then((res) => setVoteInfo(res.data))
        .catch(() => setVoteInfo(null));
    }
  }, [roomKey]);

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
                key={item}
                isSelected={selectedIdx === idx}
                onClick={() => setSelectedIdx(idx)}
              >
                <PersonText isClicked={selectedIdx === idx}>
                  {item.length > 3 ? `${item.slice(0, 3)}...` : item}
                </PersonText>
              </Nickname>
            ))}
          </NicknameBox>
        </VoteBox>
      </VoteBox>
      <Button text='투표하기' onClick={() => navigate('/rooms')} />
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
  height: 80px;
  background-color: #f9f9f9;
  padding: 19px 24px;
  borderradius: 12px;
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
