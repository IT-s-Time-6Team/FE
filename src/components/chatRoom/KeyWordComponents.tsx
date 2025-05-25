import {
  KeyWordContainer,
  KeyWord,
  PeopleCount,
  KeyWordDivider,
  KeyWordDetail,
} from '../../styles/chatRoom/chatRoom';
import people from '@assets/chatRoom/people.svg';
import { useState } from 'react';
import styled from '@emotion/styled';
import { ModalPortal } from '@components/shared/ModalPortal';
import KeywordModal from './keywordModal';
interface KeyWordComponentsProps {
  keyword: string[] | null;
  peoplenum: number;
}
const KeyWordComponents = ({ keyword, peoplenum }: KeyWordComponentsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedKeyword, setSelectedKeyword] = useState<string>('');
  const handleClick = (item: string) => {
    setSelectedKeyword(item);
    setIsOpen(true);
  };
  return (
    <>
      <KeyWordContainer>
        <KeyWord>
          <Key>
            키워드
            <Keys>
              {keyword?.map((item, index) => (
                <KeyItem key={index} onClick={() => handleClick(item)}>
                  #{item}
                </KeyItem>
              ))}
            </Keys>
          </Key>
          <PeopleCount>
            <img src={people} alt={people} style={{ width: '20px', height: '20px' }} />
            {peoplenum}
          </PeopleCount>
        </KeyWord>
        <KeyWordDivider />
        <KeyWordDetail>같은 키워드를 2명 이상 작성하면 공개됩니다.</KeyWordDetail>
      </KeyWordContainer>
      {isOpen && (
        <ModalPortal>
          <KeywordModal onClose={() => setIsOpen(false)} keyword={selectedKeyword} />
        </ModalPortal>
      )}
    </>
  );
};
export default KeyWordComponents;

const Key = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  white-space: nowrap;
`;
const Keys = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
  max-width: 150px;
`;
const KeyItem = styled.div`
  width: content-fit;
`;
