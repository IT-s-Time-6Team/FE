import styled from '@emotion/styled';
// 공용으로 쓰이는 UI 스타일 컴포넌트
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100dvh;
`;
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const SkeletonBox = styled.div`
  width: 342px;
  min-height: 376px;
  background-color: #e0e0e0;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 27px 0;
  margin-top: 25px;
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% {
      background-color: #e0e0e0;
    }
    50% {
      background-color: #f0f0f0;
    }
    100% {
      background-color: #e0e0e0;
    }
  }
`;
