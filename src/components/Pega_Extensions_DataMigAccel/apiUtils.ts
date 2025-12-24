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
    console.log(dataPageName, payload);
    const response = await PCore.getDataApiUtils().getData(dataPageName, payload, context);
    return response.data || {};
  } catch (error) {
    console.error(`Error fetching data for ${dataPageName}:`, error);
    throw error;
  }
};


const fetchPageDataPage = async(
  dataPageName: string,
  context: string,
  payload: Record<string, any> = {},
  options: Record<string, any> = {}
): Promise<FetchDataPageResult> => {
  try {
    console.log(dataPageName, payload);
    const response = await PCore.getDataPageUtils().getPageDataAsync(dataPageName, context, payload, options);
    return response || {};
  } catch (error) {
    console.error(`Error fetching data for ${dataPageName}:`, error);
    throw error;
  }
};

export { fetchPageDataPage, fetchListDataPage };
