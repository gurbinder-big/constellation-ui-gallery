import React, { useEffect, useState } from 'react';
import TimelineWidget from './timeline';

interface PegaExtensionsTimelineProps {
  getPConnect?: () => any;
  dataPage?: string;
}

declare global {
  interface Window {
    PCore: any;
  }
}

const PegaExtensionsTimeline: React.FC<PegaExtensionsTimelineProps> = ({ getPConnect, dataPage }) => {
  // ✅ FIX 1 — prevent undefined call
  const PConnect = getPConnect?.() ?? null;

  const context = PConnect?.getContextName?.() ?? '';

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!dataPage || !context || !window.PCore) {
        setData([]);
        return;
      }

      try {
        setLoading(true);

        const response = await window.PCore.getDataApiUtils().getData(dataPage, {}, context);

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
  }, [dataPage, context]);

  return (
    <TimelineWidget
      getPConnect={getPConnect}
      data={data}
      datapageName={dataPage}
      isLoading={loading} // ✅ FIX 2: now valid
    />
  );
};

export default PegaExtensionsTimeline;
