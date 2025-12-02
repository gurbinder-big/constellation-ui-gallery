import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    margin: 0px 0;

    .timeline-widget {
      width: 90%;
      margin: 20px auto;
      font-family: Arial, sans-serif;
    }

    .timeline-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .timeline-content {
      position: relative;
      padding-left: 190px;
    }

    .timeline-vertical-line {
      position: absolute;
      left: 190px;
      top: 5px;
      width: 2px;
      height: 100%;
      background-color: #ccc;
    }

    .timeline-date-group {
      margin-bottom: 30px;
    }

    .timeline-date-label {
      position: absolute;
      left: 0;
      width: 160px;
      text-align: left;
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 16px;
    }

    .timeline-event {
      position: relative;
      margin-left: 40px;
      margin-bottom: 15px;
      width: calc(100% - 40px) !important;
    }

    .timeline-dot {
      position: absolute;
      left: -59px;
      top: 0px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid white;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .timeline-dot-img {
      width: 20px;
      height: 20px;
      object-fit: contain;
    }

    .timeline-dot-icon {
      font-size: 16px;
      color: white;
      font-weight: bold;
      line-height: 1;
    }

    .timeline-card {
      padding: 15px 15px 5px 15px;
      border: 2px solid #ccc;
      border-radius: 6px;
      background-color: #fff;
      box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
      width: 100%;
    }

    .timeline-card-title {
      font-weight: bold;
      margin-bottom: 15px;
      font-size: 18px;
    }

    .timeline-card-timestamp {
      font-size: 14px;
      color: #555;
      margin-bottom: 10px;
    }

    .timeline-card-details {
      font-size: 14px;
      color: #333;
    }

    .timeline-no-event {
      margin-left: 20px;
      font-style: italic;
      color: #888;
    }

    .timeline-card-column {
      display: flex;
      flex-wrap: wrap;
    }

    .timeline-card-column div {
      flex: 0 50%;
      margin-bottom: 10px;
    }

    .timeline-card-column .timeline-card-details.timeline-card-details-message {
      flex: 100%;
    }
  `;
});
