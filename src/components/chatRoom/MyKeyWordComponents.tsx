import {
  KeyWordContainer,
  KeyWord,
  KeyWordDivider,
  KeyWordDetail,
} from '../../styles/chatRoom/chatRoom';
interface MyKeyWordComponentsProps {
  mykeyword: string[];
}
const MyKeyWordComponents = ({ mykeyword }: MyKeyWordComponentsProps) => {
  return (
    <KeyWordContainer isMyKeyword={true}>
      <KeyWord>내가 입력한 공감 키워드</KeyWord>
      <KeyWordDivider />
      <KeyWordDetail>
        {mykeyword.length > 0
          ? mykeyword.map((item) => `#${item}\t`)
          : '아직 입력한 키워드가 없습니다.'}
      </KeyWordDetail>
    </KeyWordContainer>
  );
};
export default MyKeyWordComponents;
