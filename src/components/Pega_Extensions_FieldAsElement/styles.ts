import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    .header {
        background-color: #1565c0;
        color: white;
        padding: 20px;
        text-align: center;
        margin-bottom: 30px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .comparison-container {
        background: white;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        margin-bottom: 30px;
        overflow: hidden;
    }
    .section-header {
        background-color: #f1f5f9;
        padding: 15px;
        border-bottom: 1px solid #e0e0e0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .section-content {
        display: flex;
        flex-wrap: wrap;
    }
    .old-section, .new-section {
        flex: 1;
        min-width: 300px;
        padding: 20px;
        border-right: 1px solid #e0e0e0;
    }
    .new-section {
        border-right: none;
        background-color: #fafafa;
    }
    .section-title {
        font-weight: bold;
        margin-bottom: 10px;
    }
    .explain-btn {
        background-color: #4caf50;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.3s;
    }
    .explain-btn:hover {
        background-color: #388e3c;
    }
    .explanation {
        background-color: #e8f5e9;
        padding: 15px;
        border-radius: 4px;
        margin-top: 15px;
        display: none;
    }
    ins {
        background-color: #e8f5e9;
        text-decoration: none;
        padding: 2px 0;
    }
    del {
        background-color: #ffebee;
        text-decoration: line-through;
        padding: 2px 0;
    }
    .new-sections-header {
        background-color: #1565c0;
        color: white;
        padding: 15px;
        margin-top: 40px;
        margin-bottom: 20px;
        border-radius: 5px;
    }
    .no-new-sections {
        background-color: #e3f2fd;
        padding: 15px;
        border-radius: 5px;
        text-align: center;
        margin-top: 20px;
    }
    @media (max-width: 768px) {
        .section-content {
            flex-direction: column;
        }
        .old-section, .new-section {
            border-right: none;
            border-bottom: 1px solid #e0e0e0;
        }
    }
`;

export default GlobalStyle;
