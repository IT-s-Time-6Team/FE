import styled from '@emotion/styled';

const InprogresssModeBox = () => {
  return (
    <InProgressContainer>
      <InprogressContent></InprogressContent>
    </InProgressContainer>
  );
};

export default InprogresssModeBox;

const InProgressContainer = styled.div`
  width: 287px;
  height: 343px;

  display: flex;
  flex-direction: column;
  align-items: center;
  
  border-radius: 18px;
  border: 1px solid #e4e4e4;
`;
const InprogressContent = styled.div`
  display: flex;
  flex-direction: column;
  align- items: center;
  
`;
