//ModalPortal를 생성한다.
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
interface ModalPortalProps {
  children: ReactNode;
}
export const ModalPortal = ({ children }: ModalPortalProps) => {
  const el = document.getElementById('modal');
  return el ? ReactDOM.createPortal(children, el) : null;
};
