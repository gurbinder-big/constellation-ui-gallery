import React, { useEffect, useState } from 'react';
import { initializeAuth, secureInvokeApi, logoutAndRevoke } from './pegaAuthManager';

// Define the props interface based on config.json
interface PegaInsightProps {
  title?: string;
  apiEndpoint?: string;
  buttonLabel?: string;
  getPConnect: any; // Standard Pega DX prop
}

export default function PegaInsightComponent(props: PegaInsightProps) {
  const { title, apiEndpoint, buttonLabel } = props;

  const [pegaApiData, setpegaApiData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    initializeAuth();
  }, []);

  const handleFetchInsights = async () => {
    setIsLoading(true);
    try {
      // Use the apiEndpoint from props (falling back to default if empty)
      const endpoint = apiEndpoint || '/api/LeaveRequest/v1/allcase';
      const results = await secureInvokeApi(endpoint, 'GET');
      // Save the data into state
      setpegaApiData(Array.isArray(results) ? results : results.pxResults || []);

      console.log('Business Data:', results.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.error('Access Denied or Network Error');
    }
  };

  return (
    <>
      <div className='pega-message-widget'>
        <h3>{title || 'API Component'}</h3>
        <button onClick={handleFetchInsights}>{buttonLabel || 'Fetch Data'}</button>
        <button onClick={logoutAndRevoke} style={{ marginLeft: '10px' }}>
          Logout
        </button>
      </div>
      <div>
        {pegaApiData.length > 0 ? (
          <>
            <table border={1} style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Create Date</th>
                  {/* Add more headers based on your Pega data fields */}
                </tr>
              </thead>
              <tbody>
                {pegaApiData.map(
                  (
                    PegaApi: { pyID: any; pzInsKey: any; pyStatusWork: any; pxObjClass: any; pyLabel: any },
                    index: React.Key | null | undefined,
                  ) => (
                    <tr key={index}>
                      <td>{PegaApi.pyID || PegaApi.pzInsKey}</td>
                      <td>{PegaApi.pyStatusWork || 'N/A'}</td>
                      <td>{PegaApi.pxObjClass || 'N/A'}</td>
                      <td>{PegaApi.pyLabel || 'N/A'}</td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </>
        ) : (
          !isLoading && <p>No data fetched yet.</p>
        )}
      </div>
    </>
  );
}
