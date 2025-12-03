import React, { useEffect, useState } from 'react';
import TimelineWidget from './timeline';

interface PegaExtensionsTimelineProps {
  getPConnect?: () => any;
  datapageName?: string;
}

const PegaExtensionsTimeline: React.FC<PegaExtensionsTimelineProps> = ({ getPConnect, datapageName }) => {
  const PConnect = getPConnect();
  const context = PConnect?.getContextName?.() ?? '';
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {

    const fetchData = async () => {
      if (!datapageName || !context || !window.PCore) {
        setData([]);
        return;
      }

      try {
        setLoading(true);
        const response = await PCore.getDataApiUtils().getData(
          datapageName,
          {},
          context
        );

        const results = response?.data ?? [];
        console.log(results);
        setData(results);
      } catch (e) {
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [datapageName, context]);

  return (
    <TimelineWidget
      getPConnect={getPConnect}
      data={data}
      datapageName={datapageName}
    />
  );
};

export default PegaExtensionsTimeline;
