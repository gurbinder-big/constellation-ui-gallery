import styled, { css } from 'styled-components';


export const StyledStarWrapper = styled.div(() => {
  return css`

  .timeline-container {
    width: 100%;
    max-width: 900px;
    margin: 20px auto;
    font-family: Arial, sans-serif;
  }

  .timeline-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .timeline-wrapper {
    position: relative;
    padding-left: 200px;
  }

  .timeline-line {
    position: absolute;
    left: 190px;
    top: 0;
    width: 3px;
    height: 100%;
    background: #d0d0d0;
    border-radius: 4px;
  }

  .timeline-date-group {
    position: relative;
    margin-bottom: 30px;
  }

  .timeline-date {
    position: absolute;
    left: -200px;
    width: 180px;
    font-weight: 700;
    font-size: 15px;
    color: #333;
  }

  .timeline-no-events {
    margin-left: 40px;
    font-style: italic;
    color: #888;
  }

  .timeline-event {
    position: relative;
    margin-left: 40px;
    margin-top: 30px;
  }

  .timeline-dot {
    position: absolute;
    left: -62px;
    top: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #fff;
  }

  .timeline-card {
    padding: 14px 16px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 1px 6px rgba(0,0,0,0.1);
  }

  .timeline-title {
    font-weight: 700;
    margin-bottom: 12px;
    font-size: 16px;
  }

  .timeline-content {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .timeline-content {
      position: relative;
      padding-left: 0px;
  }
  .timeline-field {
    flex: 0 0 48%;
    font-size: 13px;
  }

  .timeline-error {
      color: red;
  }
  `;
});
