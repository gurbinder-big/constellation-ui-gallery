import React, { useEffect, useState } from 'react';
import TimelineWidget from './Timeline';
import StyledPegaExtensionsTimelineWrapper from './styles';

interface PegaExtensionsTimelineProps {
  getPConnect?: () => any;
  dataPage?: string;
}

const PegaExtensionsTimeline: React.FC<PegaExtensionsTimelineProps> = ({ getPConnect, dataPage }) => {
  const PConnect = getPConnect?.() ?? null;
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const context = PConnect?.getContextName?.() ?? '';
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await (window as any).PCore.getDataApiUtils().getData(dataPage, {}, context);
        const results = response?.data?.data ?? [];
        setData(results);
      } catch (e) {
        console.error('Timeline fetch error:', e);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataPage]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data.length) {
    return <div>No Data</div>;
  }

  return (
    <StyledPegaExtensionsTimelineWrapper>
      <TimelineWidget
        getPConnect={getPConnect}
        data={data}
        datapageName={dataPage}
        isLoading={loading}
      />
    </StyledPegaExtensionsTimelineWrapper>
  );

};

export default PegaExtensionsTimeline;
