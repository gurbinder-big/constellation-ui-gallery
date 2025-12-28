import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .wrap {
    padding:12px 20px;
    background-color:#ffffff;
    font-family:Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;

    .json-box {
      max-height: 450px;
      margin-top: 20px;
      margin-bottom: 20px;
      overflow: auto;
      padding: 12px;
      border: 1px solid #ccc;
      background: #f7f7f7;
      font-family: monospace;
      font-size: 13px;
      white-space: pre-wrap;
      word-break: break-word;
    }

    select.invalid {
      border-color: #b83838;
    }

    .popup-error {
      color: #b83838;
    }

    .dx-stepper {
      display: flex;
      align-items: center;
      width: 70%;
      margin: auto;
    }

    .dx-step {
      display: flex;
      align-items: center;
      flex: 1;              /* 🔑 distribute steps evenly */
      position: relative;
      cursor: pointer;
    }

    .dx-step:last-child {
      flex: 0;              /* last step has no trailing line */
    }

    .dx-step-circle {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid #cbd5e1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      font-weight: 600;
      z-index: 1;
    }

    .dx-step-label {
      margin-left: 8px;
      white-space: nowrap;
    }

    .dx-step-line {
      flex: 1;              /* 🔑 auto width */
      height: 2px;
      background: #cbd5e1;
      margin-left: 16px;
      margin-right: 16px;
    }

    .dx-step.active .dx-step-circle {
      border-color: #2563eb;
      color: #2563eb;
    }

    .dx-step.completed .dx-step-circle {
      background: #2563eb;
      border-color: #2563eb;
      color: #fff;
    }

    .dx-step.completed .dx-step-line {
      background: #2563eb;
    }

    .dx-step {
      justify-content: flex-start;
    }

    .dx-step {
      justify-content: flex-start;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
      color: #1f2937; /* gray-800 */
    }

    table thead th {
      background-color: #f9fafb;
      text-align: left;
      font-weight: 600;
      padding: 10px 5px;
      border-bottom: 1px solid #e5e7eb;
    }

    table tbody td {
      padding: 5px;
      border-bottom: 1px solid #e5e7eb;
    }

    table tbody tr:hover {
      background-color: #f3f4f6;
    }

    table tbody tr:last-child td {
      border-bottom: none;
    }

    select, input {
      width: 100%;
      padding: 8px 10px !important;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 14px;
    }

    label {
      color: #3d3d3d;
    }

    .p-tree {
        border: 1px solid #e5e7eb;
        background: #ffffff;
        color: #4b5563;
        padding: 1.25rem;
        border-radius: 6px;
    }
    .p-component {
        font-family: var(--font-family);
        font-feature-settings: var(--font-feature-settings, normal);
        font-size: 1rem;
        font-weight: normal;
    }

    .p-tree-container {
        margin: 0;
        padding: 0;
        list-style-type: none;
        overflow: auto;
    }

    .p-tree .p-tree-container .p-treenode .p-treenode-content {
        border-radius: 6px;
        transition: box-shadow 0.2s;
        padding: 0.8rem;
    }

    .p-treenode-content {
      display: flex;
      align-items: center;
    }

    p-tree .p-tree-container .p-treenode .p-treenode-content .p-tree-toggler {
        margin-right: 0.5rem;
        width: 2rem;
        height: 2rem;
        color: #6b7280;
        border: 0 none;
        background: transparent;
        border-radius: 50%;
        transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
    }

    .p-link {
        text-align: left;
        background-color: transparent;
        margin: 0;
        padding: 0;
        border: none;
        cursor: pointer;
        user-select: none;
    }

    .p-tree-toggler {
      cursor: pointer;
      user-select: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
      flex-shrink: 0;
    }

    svg.p-icon {
        pointer-events: auto;
    }

    .p-icon {
        display: inline-block;
    }

    .p-icon {
        width: 1rem;
        height: 1rem;
    }

    .p-tree .p-tree-container .p-treenode .p-treenode-content .p-treenode-icon {
      margin-right: 0.5rem;
      color: #6b7280;
    }

    .p-tree-container {
        margin: 0;
        padding: 0;
        list-style-type: none;
        overflow: auto;
    }

    .p-treenode-children {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    .p-tree .p-tree-container .p-treenode {
        outline: 0 none;
    }


    .p-tree .p-treenode > .p-treenode-children > .p-treenode > .p-treenode-content {
      padding-left: 20px !important;
    }

    .p-tree .p-treenode > .p-treenode-children > .p-treenode {
      border-left: none;
      border-right: none;
    }

    .p-treenode-leaf .p-tree-toggler {
      visibility: hidden;
    }


    .p-tree .p-treenode > .p-treenode-children > .p-treenode > .p-treenode-children > .p-treenode > .p-treenode-content {
      padding-left: 40px !important;
    }

    .p-tree .p-treenode > .p-treenode-children > .p-treenode > .p-treenode-children > .p-treenode {
      border-left: none;
      border-right: none;
      border-bottom: none;
    }

    .p-tree .p-treenode > .p-treenode-children > .p-treenode > .p-treenode-children > .p-treenode > .p-treenode-children > .p-treenode > .p-treenode-content {
      padding-left: 60px !important;
    }

    .p-tree .p-treenode > .p-treenode-children > .p-treenode > .p-treenode-children > .p-treenode > .p-treenode-children > .p-treenode {
      border-left: none;
      border-right: none;
    }

    ul.p-tree-container, ul.p-treenode-children {
        list-style-type: none;
    }

    ul li.p-treenode:last-child {
      border-bottom: 1px #000 solid;
    }

    ul li.p-treenode  {
      border: 1px #000 solid;
      border-bottom: 0px;
    }

    li div.p-treenode-content {
      padding: 6px;
    }

  }

  .p-toast {
    top: 80px !important;
    font-size: 16px !important;
  }

  .p-toast .p-toast-message {
    background-color: rgb(249,249, 249);
    padding: 10px;
    border-radius: 10px;
  }

  .p-toast .p-toast-message-success {
    color: green;
  }

  .p-toast .p-toast-message-error {
    color: red;
  }

  .p-toast .p-toast-summary {
    font-weight: bold;
    font-size: 20px;
  }

  .p-toast svg.p-icon.p-toast-message-icon {
    display: none !important;
  }

  .autocomplete-container {
    position: relative;
    width: 100%;
    max-width: 300px;

    input {
      width: 100%;
      padding: 8px 10px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 14px;
    }

    .suggestions-list {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 1000;
      background: white;
      border: 1px solid #ddd;
      border-top: none;
      border-radius: 0 0 6px 6px;
      max-height: 200px;
      overflow-y: auto;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      margin: 0;
      padding: 0;
      list-style: none;

    li {
      padding: 8px 10px;
      cursor: pointer;

      &:hover {
        background-color: #f2f2f2;
      }
    }
  }

}


`;

export default GlobalStyle;
