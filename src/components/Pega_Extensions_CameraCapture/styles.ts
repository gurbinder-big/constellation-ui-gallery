import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    margin: 0px 0;

    .camera-container {
      width: 100%;
      height: 420px;
      border-radius: 8px;
      overflow: hidden;
      background: #000;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .camera-video {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: #000;
      transition: opacity 0.3s ease-in-out;
    }

    .captured-wrapper {
      width: '80%',
      height: 'auto',
      borderRadius: 8,
      overflow: 'hidden',
      background: '#000'
    }

    .captured-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 0.3s ease-in-out;
    }

    .camera-buttons {
      color: #fff;
      width: fit-content;
    }
  `;
});
