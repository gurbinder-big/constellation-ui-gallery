import React, { useEffect, useState, useMemo } from 'react';
import { withConfiguration } from '@pega/cosmos-react-core';
import TimelineWidget from './timeline';
import { StyledStarWrapper } from './styles';
// import './Timeline.css';

interface PegaExtensionsTimelineProps {
  getPConnect?: () => any;
}

const PegaExtensionsTimeline: React.FC<PegaExtensionsTimelineProps> = ({ getPConnect }) => {
  const PConnect = getPConnect?.() ?? null;

  const configProps = useMemo(() => PConnect?.getConfigProps?.() ?? {}, [PConnect]);
  const dataPage = configProps?.dataPage;
  const dateField = configProps?.dateField;
  const headingField = configProps?.headingField;

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const caseInfo = useMemo(
    () => PConnect?.getValue((window as any).PCore.getConstants().CASE_INFO.CASE_INFO) || {},
    [getPConnect],
  );

  useEffect(() => {
    if (!dataPage) return;
    const context = PConnect?.getContextName?.() ?? '';

    const fetchData = async () => {
      try {
        setLoading(true);
        const payload = { dataViewParameters: { CaseInstanceKey: caseInfo?.ID } };
        const response = await (window as any).PCore.getDataApiUtils().getData(dataPage, payload, context);
        setData(response?.data?.data ?? []);
      } catch (e) {
        console.error('Timeline fetch error:', e);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dataPage, PConnect]);

  if (loading) return <div>Loading...</div>;
  if (!data.length) return <div>No Data</div>;

  return (
    <>
      <StyledStarWrapper>
        <div className='pega-timeline-container'>
          <TimelineWidget
            getPConnect={getPConnect}
            data={data}
            datapageName={dataPage}
            isLoading={loading}
            dateField={dateField}
            headingField={headingField}
          />
        </div>
      </StyledStarWrapper>
    </>
  );
};

export default withConfiguration(PegaExtensionsTimeline);
