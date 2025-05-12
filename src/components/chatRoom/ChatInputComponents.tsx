import { useCallback, useEffect } from 'react';
import { ChatInput, ChatInputContainer, SendButton } from '../../styles/chatRoom/chatRoom';
import SendIcon from '@assets/send.svg?react';

interface ChatInputComponentsProps {
  input: string;
  setInput: (input: string) => void;
  isInput: boolean;
  setIsInput: (isInput: boolean) => void;
  sendKeyword: () => void;
}
const ChatInputComponents = ({
  input,
  setInput,
  isInput,
  sendKeyword,
  setIsInput,
}: ChatInputComponentsProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.isComposing) return;
      if (e.key === 'Enter' && isInput) {
        e.preventDefault?.();
        sendKeyword();
      }
    },
    [isInput, input],
  );
  useEffect(() => {
    if (input.length > 0) {
      setIsInput(true);
    } else {
      setIsInput(false);
    }
  }, [input]);
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  return (
    <ChatInputContainer>
      <ChatInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`키워드를 입력해 주세요.\n(키워드마다 앞에 #을 붙여주세요. 예: #게임)`}
      />
      <SendButton isInput={isInput} onClick={sendKeyword} disabled={!isInput}>
        <SendIcon />
      </SendButton>
    </ChatInputContainer>
  );
};
export default ChatInputComponents;
