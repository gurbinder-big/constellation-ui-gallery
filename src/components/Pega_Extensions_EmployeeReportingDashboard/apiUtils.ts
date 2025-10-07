type FetchDataPageResult = {
  data?: any[];
  hasMoreResults?: boolean;
  [key: string]: any;
};

const fetchListDataPage = async(
  dataPageName: string,
  context: string,
  payload: Record<string, any> = {}
): Promise<FetchDataPageResult> => {
  try {
    const response = await PCore.getDataApiUtils().getData(dataPageName, payload, context);
    return response.data || {};
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(dataPageName);

    // eslint-disable-next-line no-console
    console.error(`Error fetching data for ${dataPageName}:`, error);
    return {};
  }
};

const fetchPageDataPage = async(
  dataPageName: string,
  context: string,
  payload: Record<string, any> = {},
  options: Record<string, any> = {}
): Promise<FetchDataPageResult> => {
  try {
    const response = await PCore.getDataPageUtils().getPageDataAsync(dataPageName, context, payload, options);
    return response || {};
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(dataPageName);

    // eslint-disable-next-line no-console
    console.error(`Error fetching data for ${dataPageName}:`, error);
    return {};
  }
};

export { fetchPageDataPage, fetchListDataPage };
