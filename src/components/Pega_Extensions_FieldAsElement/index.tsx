import { withConfiguration } from '@pega/cosmos-react-core';
import parse from 'html-react-parser';
import { useEffect, useState, useMemo, useRef } from 'react';
import { fetchPageDataPage } from './apiUtils';
import '../create-nonce';
import styled from 'styled-components';

const DashboardWrapper = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 20px;
  background-color: #f5f7fa;
  color: #333;
`;

type ActionableNewButtonProps = {
  value: string;
  localAction: string;
  getPConnect: any;
  dataPageForCaseInfo: string;
};

export const PegaExtensionsFieldAsElement = (props: ActionableNewButtonProps) => {
  const { getPConnect, value, localAction, dataPageForCaseInfo } = props;

  const [htmlData, setHtmlData] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const caseInfo = useMemo(() => {
    return (
      getPConnect().getValue(
        (window as any).PCore.getConstants().CASE_INFO.CASE_INFO
      ) || {}
    );
  }, [getPConnect]);


  /**
   * 📌 Load HTML from Data Page
   */
  useEffect(() => {
    async function loadData() {
      const parameters = { CaseKey: caseInfo?.ID };

      const res = await fetchPageDataPage(
        dataPageForCaseInfo,
        getPConnect().getContextName(),
        parameters,
        {}
      );

      setHtmlData(res.FinalStreamData || '<p>No DisplayHTML content available</p>');
    }

    if (caseInfo?.ID) loadData();
  }, [caseInfo, dataPageForCaseInfo, getPConnect]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handler = (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.matches('.explain-btn')) {
        const id = target.getAttribute('data-id');
        if (!id) return;

        const el = container.querySelector(`#${id}`);
        if (el) {
          el.setAttribute(
            'style',
            el.getAttribute('style') === 'display: block;' ? 'display: none;' : 'display: block;'
          );
        }
      }
    };

    container.addEventListener('click', handler);

    return () => container.removeEventListener('click', handler);
  }, []);


  if (!value || !localAction) return null;


  return (
    <DashboardWrapper>
      <div ref={containerRef}>
        {htmlData
          ? parse(
            htmlData
              .replace(
                /onclick='toggleExplanation\('(.*?)'\)'/g,
                'class=\'explain-btn\' data-id=\'$1\''
              )
              .replace(
                /onclick="toggleExplanation\('(.*?)'\)"/g,
                'class=\'explain-btn\' data-id=\'$1\''
              )
            )
          : null}
      </div>
    </DashboardWrapper>
  );
};

export default withConfiguration(PegaExtensionsFieldAsElement);
