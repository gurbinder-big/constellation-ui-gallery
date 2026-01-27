import { useEffect } from 'react';
import { withConfiguration } from '@pega/cosmos-react-core';
import type { PConnFieldProps } from '../shared/PConnProps';
import '../shared/create-nonce';
import Map from './Map';

import StyledPegaExtensionsArcgismapWrapper from './styles';

interface PegaExtensionsArcgismapProps extends PConnFieldProps {
    header: string;
}

export const PegaExtensionsArcgismap = (props: PegaExtensionsArcgismapProps) => {

  // const { getPConnect } = props;

  // const PConnect = getPConnect();
  // const dataViewName = 'D_pyMyWorkList';
  // const context = PConnect.getContextName();

  console.log(props);

  return (
    <StyledPegaExtensionsArcgismapWrapper>
      <Map />
    </StyledPegaExtensionsArcgismapWrapper>
  );

}

export default withConfiguration(PegaExtensionsArcgismap);
