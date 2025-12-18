// import React, { useEffect, useState, useMemo } from 'react';
// import TimelineWidget from './timeline';

// interface PegaExtensionsTimelineProps {
//   getPConnect?: () => any;
//   dataPage?: string;
//   dateField?: string;
//   headingField?: string;
// }

// const PegaExtensionsTimelineZoom: React.FC<PegaExtensionsTimelineProps> = ({
//   getPConnect,
//   dataPage: propDataPage,
//   dateField: propDateField,
//   headingField: propHeadingField,
// }) => {
//   const PConnect = getPConnect?.() ?? null;

//   // Dynamically fetch config props if not provided via props
//   const { dataPage, dateField, headingField } = useMemo(() => {
//     const config = PConnect?.getConfigProps?.() ?? {};
//     return {
//       dataPage: propDataPage ?? config.dataPage,
//       dateField: propDateField ?? config.dateField,
//       headingField: propHeadingField ?? config.headingField,
//     };
//   }, [PConnect, propDataPage, propDateField, propHeadingField]);

//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const caseInfo = useMemo(
//     () => PConnect?.getValue((window as any).PCore.getConstants().CASE_INFO.CASE_INFO) || {},
//     [getPConnect],
//   );

//   useEffect(() => {
//     if (!dataPage) return; // Only fetch if dataPage is defined
//     const context = PConnect?.getContextName?.() ?? '';

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const payload = { dataViewParameters: { CaseInstanceKey: caseInfo?.ID } };
//         const response = await (window as any).PCore.getDataApiUtils().getData(dataPage, payload, context);
//         setData(response?.data?.data ?? []);
//       } catch (e) {
//         console.error('Timeline fetch error:', e);
//         setData([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [dataPage, PConnect, caseInfo]);

//   if (loading) return <div>Loading...</div>;
//   if (!data.length) return <div>No Data</div>;

//   return (
//     <div className='pega-timeline-container'>
//       <TimelineWidget
//         getPConnect={getPConnect}
//         data={data}
//         datapageName={dataPage}
//         isLoading={loading}
//         dateField={dateField}
//         headingField={headingField}
//       />
//     </div>
//   );
// };

// export default PegaExtensionsTimelineZoom;

import React, { useEffect, useState, useMemo } from 'react';
import TimelineWidget from './timeline';

interface PegaExtensionsTimelineProps {
  getPConnect?: () => any;
  dataPage?: string;
  dateField?: string;
  headingField?: string;
}

const PegaExtensionsTimelineZoom: React.FC<PegaExtensionsTimelineProps> = ({
  getPConnect,
  dataPage: propDataPage,
  dateField: propDateField,
  headingField: propHeadingField,
}) => {
  const PConnect = getPConnect?.() ?? null;

  const { dataPage, dateField, headingField } = useMemo(() => {
    const config = PConnect?.getConfigProps?.() ?? {};
    return {
      dataPage: propDataPage ?? config.dataPage,
      dateField: propDateField ?? config.dateField,
      headingField: propHeadingField ?? config.headingField,
    };
  }, [PConnect, propDataPage, propDateField, propHeadingField]);

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
  }, [dataPage, PConnect, caseInfo]);

  if (loading) return <div>Loading...</div>;
  if (!data.length) return <div>No Data</div>;

  return (
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
  );
};

export default PegaExtensionsTimelineZoom;
