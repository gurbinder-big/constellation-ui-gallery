import styled, { css } from 'styled-components';

export const Label = styled.label`
  color: red;
`;

export const StyledStarWrapper = styled.div(() => {
  return css`
    display: inline-flex;
    color: red !important;
    .star {
      background-color: red;
      height: 100rem;
      width: 2rem;
      transition: all 0.2s ease-in-out;
      transform-origin: center;
    }
    .star:hover:not(.disabled):not(.readonly) {
      transform: scale(1.2);
    }
  `;
});
