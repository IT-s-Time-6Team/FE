import styled from '@emotion/styled';

//채팅방 생성완료,사용자 입장 페이지에서 사용되는 버튼
const Button = ({
  text,
  active = false,
  className,
  onClick,
}: {
  text: string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <>
      <NaviButton $active={active} className={className} onClick={onClick}>
        {text}
      </NaviButton>
    </>
  );
};
export default Button;

const NaviButton = styled.button<{ $active: boolean }>`
  width: 253px;
  height: 57px;

  border-radius: 15px;
  font-size: 16px;
  font-weight: 600;
  align-self: center;

  background-color: ${({ $active }) => ($active ? '#FF7913' : '#DADADA')};
  color: ${({ $active }) => ($active ? '#FFFFFF' : '#939393')};
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  cursor: ${({ $active }) => ($active ? 'pointer' : 'not-allowed')};
`;
