

import styled, { keyframes } from 'styled-components';

const IndeterminateLoaderAnimation = keyframes`
0% {
    transform: translateX(0) scaleX(0);
}
40% {
    transform: translateX(0) scaleX(0.4);
}
100% {
    transform: translateX(100%) scaleX(0.5);
}
`;

export const IndeterminateLoader = styled.div`
height: 4px;
  background-color: rgba(5, 114, 206, 0.2);
  width: 100%;
  overflow: hidden;
  div {
    width: 100%;
    height: 100%;
    background-color: rgb(5, 114, 206);
    animation: ${IndeterminateLoaderAnimation} 1s infinite linear;
    transform-origin: 0% 50%;
  }

`;


