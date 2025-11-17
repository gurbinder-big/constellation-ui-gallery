import { withConfiguration } from '@pega/cosmos-react-core';
import parse from 'html-react-parser';
import { useEffect, useState, useMemo } from 'react';
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
  const [htmlData, setHtmlData] = useState<any>(null);
  const caseInfo = useMemo(() => {
    return (
      getPConnect().getValue(
        (window as any).PCore.getConstants().CASE_INFO.CASE_INFO
      ) || []
    );
  }, [getPConnect]);

  // const caseData = (window as any).PCore.getDataApiUtils().getCaseEditMetadata(caseInfo?.ID, getPConnect().getContextName())

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(caseInfo);

    async function loadData() {
      const parameters = {
        CaseKey: caseInfo?.ID,
      };
      const res = await fetchPageDataPage(dataPageForCaseInfo, getPConnect().getContextName(), parameters, {});
      // eslint-disable-next-line no-console
      console.log(res);
      setHtmlData(res.FinalStreamData);
    }
    loadData();
  }, [caseInfo, dataPageForCaseInfo, getPConnect]);


  if (value && localAction) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const availableActions =
      getPConnect().getValue((window as any).PCore.getConstants().CASE_INFO.AVAILABLEACTIONS) || [];
    // const targetAction = availableActions.find((action: { ID: string }) => action.ID === localAction);
    return (
      <DashboardWrapper>
        { parse(htmlData || '<p>No DisplayHTML content available</p>') }
      </DashboardWrapper>
    );
  }
  return null;
};

export default withConfiguration(PegaExtensionsFieldAsElement);
