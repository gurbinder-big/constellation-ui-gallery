const fetchDataPage = async (
  dataPageName: string,
  context: string,
  payload: Record<string, any> = {}
) => {
  try {
    const response = await PCore.getDataApiUtils().getData(dataPageName, payload, context);
    return response.data || { data: [] };
  } catch (error) {
    return { data: [] };
  }
};
export default fetchDataPage;
