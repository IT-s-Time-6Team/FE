import styled from '@emotion/styled';

const Button = ({ text, active = false }: { text: string; active?: boolean }) => {
  return (
    <>
      <NaviButton $active={active}>{text}</NaviButton>
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
  position: absolute;
  bottom: 47px;

  background-color: ${({ $active }) => ($active ? '#FF7913' : '#DADADA')};
  color: ${({ $active }) => ($active ? '#FFFFFF' : '#939393')};
  transition: background-color 0.2s ease;
  cursor: ${({ $active }) => ($active ? 'pointer' : 'not-allowed')};
`;
