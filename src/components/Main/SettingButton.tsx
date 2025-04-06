import styled from '@emotion/styled';
import { Title, SubTitle } from '@components/shared/TextStyles';
import ChevronUpIcon from '@assets/chevronup_icon.svg?react';
import ChevronDownIcon from '@assets/chevrondown_icon.svg?react';

const SettingButton = ({
  label,
  value,
  unit = '명',
  onIncrease,
  onDecrease,
  isDownActive = true,
  isUpActive = true,
}: {
  label: string;
  value: number | string;
  unit?: string;
  onIncrease: () => void;
  onDecrease: () => void;
  isDownActive?: boolean;
  isUpActive?: boolean;
}) => (
  <CounterContainer>
    <InfoText>{label}</InfoText>
    <CounterControls>
      <ChevronDown $isDownActive={isDownActive} onClick={onDecrease} />
      <Counter>{Number(value) === 0 ? '없음' : `${value}${unit}`}</Counter>
      <ChevronUp $isUpActive={isUpActive} onClick={onIncrease} />
    </CounterControls>
  </CounterContainer>
);
export default SettingButton;

const CounterContainer = styled.div`
  width: 220px;
  margin-right: 15px;

  display: flex;
  flex-direction: row;
  gap: 53px;
`;

const InfoText = styled(Title)`
  width: 80px;
  font-size: 14px;
  line-height: 140%;
`;

const CounterControls = styled.div`
  width:  width: calc(100% - 80px - 53px);

  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  
  gap: 17px;
`;

const Counter = styled(SubTitle)`
  color: #3e3333;
  line-height: 140%;
`;

const ChevronDown = styled(ChevronDownIcon, {
  shouldForwardProp: (prop) => prop !== '$isDownActive',
})<{ $isDownActive: boolean }>`
  path {
    fill: ${({ $isDownActive }) => ($isDownActive ? '#F6F6F6' : '#DADADA')};
    transition: fill 0.2s ease;
  }
  cursor: ${({ $isDownActive }) => ($isDownActive ? 'default' : 'pointer')};
`;
const ChevronUp = styled(ChevronUpIcon, {
  shouldForwardProp: (prop) => prop !== '$isUpActive',
})<{ $isUpActive: boolean }>`
  path {
    fill: ${({ $isUpActive }) => ($isUpActive ? '#F6F6F6' : '#DADADA')};
    transition: fill 0.2s ease;
  }
  cursor: ${({ $isUpActive }) => ($isUpActive ? 'default' : 'pointer')};
`;
