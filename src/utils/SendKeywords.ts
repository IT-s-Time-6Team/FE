import { Client } from '@stomp/stompjs';

interface SendKeywordsProps {
  stompClient: Client | null;
  roomKey: string;
  input: string;
  setInput: (input: string) => void;
  setMyKeyword: React.Dispatch<React.SetStateAction<string[]>>;
  mykeyword: string[];
}
const SendKeywords = ({
  stompClient,
  roomKey,
  input,
  setInput,
  setMyKeyword,
  mykeyword,
}: SendKeywordsProps) => {
  if (stompClient && input.trim()) {
    const keywords = input
      .split(' ')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (keywords.length === 0) {
      setInput('');
      return;
    }

    const newKeywords = keywords.filter((k) => !mykeyword.includes(k));

    if (newKeywords.length === 0) {
      setInput('');
      return;
    }

    // 서버 전송
    newKeywords.forEach((keyword) => {
      stompClient.publish({
        destination: `/app/room/${roomKey}/keyword`,
        body: JSON.stringify({ keyword }),
      });
    });

    setMyKeyword((prev) => [...prev, ...newKeywords]);
    setInput('');
  }
};
export default SendKeywords;
