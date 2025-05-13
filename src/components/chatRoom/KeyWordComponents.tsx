import {
  KeyWordContainer,
  KeyWord,
  PeopleCount,
  KeyWordDivider,
  KeyWordDetail,
} from '../../styles/chatRoom/chatRoom';
import people from '@assets/chatRoom/people.svg';

interface KeyWordComponentsProps {
  keyword: string | null;
  peoplenum: number;
}
const KeyWordComponents = ({ keyword, peoplenum }: KeyWordComponentsProps) => {
  return (
    <>
      <KeyWordContainer>
        <KeyWord>
          사람들이 공감한 키워드
          <PeopleCount>
            <img src={people} alt={people} />
            {peoplenum}
          </PeopleCount>
        </KeyWord>
        <KeyWordDivider />
        <KeyWordDetail>
          {keyword ? `${keyword}` : '같은 키워드를 2명 이상 작성하면 공개됩니다.'}
        </KeyWordDetail>
      </KeyWordContainer>
    </>
  );
};
export default KeyWordComponents;
