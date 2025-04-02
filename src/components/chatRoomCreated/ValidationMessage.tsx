import styled from '@emotion/styled';

type ValidationType = 'nickname' | 'password';
const messages = {
  nickname: {
    true: '아주 멋진 닉네임이에요!',
    false: '닉네임을 다시 지어주세요!     *특수문자,이모티콘 제외 1글자 이상',
    null: '특수문자, 이모티콘 제외 1글자 이상',
  },
  password: {
    true: '안전하게 채팅방을 지킬 수 있겠군요!',
    false: '다른 비밀번호가 필요해요!   *영문 소문자,특수문자 포함(,./~) 6글자',
    null: '영문 소문자, 특수문자 포함(,./~) 6글자',
  },
};

const ValidationMessage = ({
  valid,
  type = 'nickname',
}: {
  valid: boolean | null;
  type?: ValidationType;
}) => {
  const message = messages[type][String(valid) as 'true' | 'false' | 'null'];
  return <MessageText $valid={valid}>{message}</MessageText>;
};

export default ValidationMessage;
const MessageText = styled.p<{ $valid: boolean | null }>`
  white-space: pre-wrap;
  color: #b7b7b7;
  font-size: 10px;
  font-weight: 500;
`;
