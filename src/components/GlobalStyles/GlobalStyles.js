// @flow
import { createGlobalStyle } from 'styled-components';

import { COLORS } from '../../constants';
import circularBook from '../../fonts/CircularStd-Book.woff2';
import circularMedium from '../../fonts/CircularStd-Medium.woff2';
import circularBold from '../../fonts/CircularStd-Bold.woff2';
import circularBlack from '../../fonts/CircularStd-Black.woff2';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Circular';
    src: url(${circularBook}) format('woff2');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular';
    src: url(${circularMedium}) format('woff2');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular';
    src: url(${circularBold}) format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular';
    src: url(${circularBlack}) format('woff2');
    font-weight: 900;
    font-style: normal;
  }

  ::-moz-selection { /* Code for Firefox */
    color: #000;
    background: ${COLORS.aqua[300]};
  }

  ::selection {
    color: #000;
    background: ${COLORS.aqua[300]};
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  html, body, div,
  input, button, select, option,
  h1, h2, h3, h4, h5, h6, p,
  text {
    font-family: 'Circular';
  }

  html, body {
    max-width: 100vw;
  }


  /* http://meyerweb.com/eric/tools/css/reset/
    v2.0 | 20110126
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  /* table {
    border-collapse: collapse;
    border-spacing: 0;
  } */

  /* Styles for the Tippy tooltip library */
  .tippy-tooltip {
    line-height: 1.5 !important;
    padding: 1rem !important;
  }

  .tippy-popper {
    pointer-events: auto !important;
  }
`;

export default GlobalStyles;
