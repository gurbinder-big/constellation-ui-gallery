import { withConfiguration, Flex, Button } from '@pega/cosmos-react-core';

type ActionableButtonProps = {
  label: string;
  dataPageName: string;
  context: string;
  payload?: Record<string, any>;
};

type FetchDataPageResult = {
  [key: string]: any;
};

const fetchDataPage = async (
  dataPageName: string,
  context: string,
  payload: Record<string, any> = {}
): Promise<FetchDataPageResult> => {
  try {
    const response = await PCore.getDataApiUtils().getData(dataPageName, payload, context);
    // eslint-disable-next-line no-console
    console.log(response);
    return response.data || {};
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error fetching data for ${dataPageName}:`, error);
    return {};
  }
};

export const PegaExtensionsActionButton = (props: ActionableButtonProps) => {
  const { label, dataPageName, context, payload = {} } = props;

  const handleClick = async () => {
    const result = await fetchDataPage(dataPageName, context, payload);
    // For now, just log the data — can be extended to update state or trigger further actions
    // eslint-disable-next-line no-console
    console.log('Fetched Data Page Result:', result);
  };

  return (
    <Flex container={{ direction: 'row' }}>
      <Button onClick={handleClick}>{label}</Button>
    </Flex>
  );
};

export default withConfiguration(PegaExtensionsActionButton);
