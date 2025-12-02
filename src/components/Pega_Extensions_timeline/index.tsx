// import React, { useEffect, useState } from 'react';
// import { withConfiguration } from '@pega/cosmos-react-core';

// import StyledPegaExtensionsTimelineWrapper from './styles';
// import TimelineWidget from './timeline';

// interface PegaExtensionsTimelineProps {
//   datapageName: string;
//   title: string;
// }

// function PegaExtensionsTimeline(props: PegaExtensionsTimelineProps) {
//   const { datapageName } = props;

//   const [records, setRecords] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!datapageName) return;

//     const fetchData = async () => {
//       try {
//         // Pega DX API pattern
//         const resp = await fetch(`/api/v1/data/${datapageName}`);
//         const json = await resp.json();

//         const results = json?.pxResults || json?.data || json?.items || Array.isArray(json) ? json : [];

//         setRecords(results);
//       } catch (e) {
//         console.error('DATAPAGE FETCH ERROR:', e);
//         setRecords([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [datapageName]);

//   if (loading) return <div>Loading Timeline...</div>;

//   return (
//     <StyledPegaExtensionsTimelineWrapper>
//       <TimelineWidget data={records} />
//     </StyledPegaExtensionsTimelineWrapper>
//   );
// }

// export default withConfiguration(PegaExtensionsTimeline);

import React from 'react';
import TimelineWidget from './timeline';

interface PegaExtensionsTimelineProps {
  getPConnect?: () => any;
  datapageName?: string;
}

// Wrapper component to pass props from Pega
const PegaExtensionsTimeline: React.FC<PegaExtensionsTimelineProps> = ({ getPConnect, datapageName }) => {
  return <TimelineWidget getPConnect={getPConnect} datapageName={datapageName} />;
};

export default PegaExtensionsTimeline;
