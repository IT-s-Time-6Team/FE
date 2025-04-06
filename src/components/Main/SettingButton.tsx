import styled from '@emotion/styled';
import { Title, SubTitle } from '@components/shared/TextStyles';
import ChevronUpIcon from '@assets/cheveronup_icon.svg?react';
import ChevronDownIcon from '@assets/cheverdown_icon.svg?react';

const SettingButton = ({
  label,
  value,
  unit = '명',
  onIncrease,
  onDecrease,
  down = true,
  up = true,
}: {
  label: string;
  value: number;
  unit?: string;
  onIncrease: () => void;
  onDecrease: () => void;
  down?: boolean;
  up?: boolean;
}) => (
  <CounterContainer>
    <InfoText>{label}</InfoText>
    <CounterControls>
      <ChevronDown $down={down} onClick={onDecrease} />
      <Counter>
        {value}
        {unit}
      </Counter>
      <ChevronUp $up={up} onClick={onIncrease} />
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
  gap: 17px;
`;

const Counter = styled(SubTitle)`
  color: #3e3333;
  line-height: 140%;
`;

const ChevronDown = styled(ChevronDownIcon)<{ $down: boolean }>`
  path {
    fill: ${({ $down }) => ($down ? '#F6F6F6' : '#DADADA')};
    transition: fill 0.2s ease;
  }
  cursor: ${({ $down }) => ($down ? 'default' : 'pointer')};
`;
const ChevronUp = styled(ChevronUpIcon)<{ $up: boolean }>`
  path {
    fill: ${({ $up }) => ($up ? '#F6F6F6' : '#DADADA')};
    transition: fill 0.2s ease;
  }
  cursor: ${({ $up }) => ($up ? 'default' : 'pointer')};
`;
