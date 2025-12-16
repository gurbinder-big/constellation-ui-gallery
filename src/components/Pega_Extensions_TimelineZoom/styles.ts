import styled, { css } from 'styled-components';

export default styled.div(
  () => css`
    /* ✅ Make styles work inside Pega Dev Studio */
    :host {
      all: initial;
    }

    & {
      font-family: Arial, sans-serif;
      display: block;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    /* -------- Root Container -------- */
    .timeline-widget {
      width: 100%;
      max-width: 900px;
      margin: 20px auto;
    }

    .timeline-header {
      text-align: center;
      margin-bottom: 20px;
    }

    /* -------- Timeline Layout -------- */
    .timeline-content {
      position: relative;
      padding-left: 0px;
    }

    .timeline-vertical-line {
      position: absolute;
      left: 190px;
      top: 0;
      width: 3px;
      height: 100%;
      background: #d0d0d0;
      border-radius: 4px;
    }

    /* -------- Date Section -------- */
    .timeline-date-group {
      position: relative;
      margin-bottom: 30px;
    }

    .timeline-date-label {
      position: absolute;
      left: -200px;
      width: 180px;
      text-align: left;
      font-weight: 700;
      font-size: 15px;
      color: #333;
    }

    /* -------- Timeline Event -------- */
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
    }

    .timeline-dot-icon {
      font-size: 16px;
      color: #fff;
    }

    /* -------- Card -------- */
    .timeline-card {
      padding: 14px 16px;
      border: 2px solid #ccc;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
    }

    .timeline-card-title {
      font-weight: 700;
      margin-bottom: 12px;
      font-size: 16px;
    }

    .timeline-card-timestamp {
      font-size: 13px;
      color: #555;
      margin-bottom: 12px;
    }

    .timeline-card-column {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .timeline-card-column div {
      flex: 0 0 48%;
      font-size: 13px;
    }

    .timeline-no-event {
      margin-left: 40px;
      font-style: italic;
      color: #888;
    }
  `,
);
