import { useEffect } from 'react';
import { withConfiguration, FieldGroup, Grid } from '@pega/cosmos-react-core';
import '../shared/create-nonce';

type ComponentProps = {
  heading: string;
  NumCols: string;
  messageString: string;
  getPConnect: any;
  children: any;
};

export const PegaExtensionsMessagingEventListener = (props: ComponentProps) => {
  const { heading, NumCols, messageString, getPConnect, children } = props;

  const nCols = parseInt(NumCols, 10) || 0;
  const gridTemplateColumns =
    nCols === 0
      ? 'repeat(auto-fit, minmax(40ch, 1fr))'
      : `repeat(${nCols}, minmax(0, 1fr))`;

  useEffect(() => {
    if (!messageString) return;
    const pConn = getPConnect();
    const context = pConn.getContextName();
    const caseInstanceKey = pConn.getValue((window as any).PCore.getConstants().CASE_INFO.CASE_INFO_ID);

    const filter = {
      matcher : messageString,
      criteria: {
        ID: caseInstanceKey
      },
    };

    const subscriptionId = (window as any).PCore.getMessagingServiceManager().subscribe(filter,
        () => {
          // refresh logic
        },
        context
      );

    return () => {
      (window as any).PCore.getMessagingServiceManager().unsubscribe(subscriptionId);
    };
  }, [messageString, getPConnect]);

  return (
    <FieldGroup name={heading}>
      <Grid
        container={{
          cols: gridTemplateColumns,
          gap: 2,
        }}
      >
        {children}
      </Grid>
    </FieldGroup>
  );
};

export default withConfiguration(PegaExtensionsMessagingEventListener);
