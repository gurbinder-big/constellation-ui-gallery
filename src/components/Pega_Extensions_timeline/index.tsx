// import { Fragment } from 'react';
import { withConfiguration } from '@pega/cosmos-react-core';

// import type { PConnFieldProps } from '../shared/PConnProps';

// import StyledPegaExtensionsTimelineWrapper from './styles';
import TimelineWidget from './timeline';

// interface for props
// interface PegaExtensionsTimelineProps extends PConnFieldProps {
//   // If any, enter additional props that only exist on TextInput here
//   title: string;
//   createLabel: string;
//   updateLabel: string;
//   resolveLabel: string;
//   createOperator: any;
//   updateOperator: any;
//   resolveOperator: any;
//   createDateTime: string;
//   updateDateTime: string;
//   resolveDateTime: string;
//   hideLabel: boolean;
// }

// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function PegaExtensionsTimeline() {
  return (
    <>
      <TimelineWidget />
    </>
  );
}

export default withConfiguration(PegaExtensionsTimeline);

// as objects are there in props, shallow comparision fails & re-rendering of comp happens even with
// same key value pairs in obj. hence using custom comparison function on when to re-render
// const comparisonFn = (prevProps, nextProps) => {
//   return prevProps.updateDateTime === nextProps.updateDateTime;
// };
