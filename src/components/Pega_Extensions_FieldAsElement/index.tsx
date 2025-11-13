import { withConfiguration, Flex } from '@pega/cosmos-react-core';
import '../create-nonce';

type ActionableNewButtonProps = {
  value: string;
  localAction: string;
  getPConnect: any;
};

export const PegaExtensionsFieldAsElement = (props: ActionableNewButtonProps) => {
  const { getPConnect, value, localAction } = props;
  if (value && localAction) {
    const availableActions =
      getPConnect().getValue((window as any).PCore.getConstants().CASE_INFO.AVAILABLEACTIONS) || [];
    // const targetAction = availableActions.find((action: { ID: string }) => action.ID === localAction);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const LaunchLocalAction = async () => {
      // eslint-disable-next-line no-console
      console.log('okkkk');
      try {

        getPConnect().getListActions().updateProperty('.FirstName', 'John Doe dsadsa');

        getPConnect().getActionsApi().updateFieldValue('.FirstName', 'John Doe m');

        getPConnect().getActionsApi().updateFieldValue('FirstName', 'John Doe lp');

      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
      // eslint-disable-next-line no-console
      console.log(availableActions);
    };
    return (
      <Flex container={{ direction: 'row' }}>
        <p> its a text </p>
      </Flex>
    );
  }
  return null;
};

export default withConfiguration(PegaExtensionsFieldAsElement);
