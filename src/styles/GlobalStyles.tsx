import { Global, css } from '@emotion/react';
import pretendardWoof2 from '../assets/PretendardVariable.woff2';
const GlobalStyles = () => (
  <Global
    styles={css`
      @font-face {
        font-family: 'Pretendard Variable';
        font-weight: 45 920;
        font-style: normal;
        font-display: swap;
        src: url(${pretendardWoof2}) format('woff2-variations');
      }
      * {
        box-sizing: border-box;
        font-family: 'Pretendard Variable', sans-serif;
        margin: 0;
        padding: 0;
      }
      body {
        color: black;
      }

      input:focus {
      }
      a {
        text-decoration: none;
        color: inherit;
      }

      a:visited {
        color: inherit;
      }
      button {
        border: none;
      }
    `}
  />
);

export default GlobalStyles;
