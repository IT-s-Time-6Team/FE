import styled from '@emotion/styled';
// 채팅룸 종료 페이지에서 사용되는 버튼
const Button = ({ text }: { text: string }) => {
  return (
    <>
      <NaviButton>{text}</NaviButton>
    </>
  );
};
export default Button;
const NaviButton = styled.button`
  width: 253px;
  height: 57px;
  background-color: #ff7913;
  color: white;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  align-self: center;
  position: absolute;
  bottom: 47px;
`;
