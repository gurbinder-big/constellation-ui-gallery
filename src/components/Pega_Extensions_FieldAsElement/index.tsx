import { withConfiguration, Flex } from '@pega/cosmos-react-core';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import '../create-nonce';

type ActionableNewButtonProps = {
  value: string;
  localAction: string;
  getPConnect: any;
};

export const PegaExtensionsFieldAsElement = (props: ActionableNewButtonProps) => {
  const { getPConnect, value, localAction } = props;
  const [caseData, setCaseData] = useState<any>(null);
  const caseInfo = getPConnect().getValue((window as any).PCore.getConstants().CASE_INFO.CASE_INFO) || [];
  const caseInfoContent = getPConnect().getValue((window as any).PCore.getConstants().CASE_INFO.CASE_INFO_CONTENT) || [];

  // const caseData = (window as any).PCore.getDataApiUtils().getCaseEditMetadata(caseInfo?.ID, getPConnect().getContextName())

  useEffect(() => {
    if (!caseInfo?.ID) return;
    const apiUtils = (window as any).PCore.getDataApiUtils();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { invokeCustomRestApi } = (window as any).PCore.getRestClient();

    // invokeCustomRestApi(`/api/v1/cases/${caseInfo.ID}`, {
    //    method: 'GET',
    //    body: {},
    //    headers: {},
    // })
    // .then((d : any) => {
    //   // eslint-disable-next-line no-console
    //   console.log(d);
    // })
    // .catch((error : any) => {
    //   // eslint-disable-next-line no-console
    //   console.log(error);
    // });

    apiUtils
      .getCaseEditMetadata(caseInfo.ID, getPConnect().getContextName())
      .then((data: any) => {
        setCaseData(data);
        // eslint-disable-next-line no-console
        console.log('resolved caseData:', data);
      })
      .catch((err: any) => {
        // eslint-disable-next-line no-console
        console.error('case metadata error:', err)
      });
  }, [caseInfo?.ID, getPConnect]);


  // eslint-disable-next-line no-console
  console.log(caseInfo);

  // eslint-disable-next-line no-console
  console.log(caseInfoContent);

  // eslint-disable-next-line no-console
  console.log(caseInfo?.ID);

  // eslint-disable-next-line no-console
  console.log(caseData);

  if (value && localAction) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const availableActions =
      getPConnect().getValue((window as any).PCore.getConstants().CASE_INFO.AVAILABLEACTIONS) || [];
    // const targetAction = availableActions.find((action: { ID: string }) => action.ID === localAction);
    return (
      <Flex container={{ direction: 'row' }}>
      { parse(caseInfo?.content?.DisplayHTML || '<p>No DisplayHTML content available</p>') }
      </Flex>
    );
  }
  return null;
};

export default withConfiguration(PegaExtensionsFieldAsElement);
