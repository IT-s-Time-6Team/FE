import styled from '@emotion/styled';

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

  background-color: #dadada;
  color: #939393;

  border-radius: 15px;

  font-size: 16px;
  font-weight: 600;

  cursor: pointer;
  align-self: center;
  position: absolute;
  bottom: 47px;
`;
