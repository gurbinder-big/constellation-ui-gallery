import { useEffect } from 'react';
import { withConfiguration } from '@pega/cosmos-react-core';
import type { PConnFieldProps } from '../shared/PConnProps';
import '../shared/create-nonce';

// import Graphic from "@arcgis/core/Graphic.js";
// import Point from "@arcgis/core/geometry/Point.js";
// import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";

import { ArcgisMap, ArcgisSearch, ArcgisLegend } from "@arcgis/map-components-react";

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

  const handleViewReady = (event: any) => {
    const { view } = event.target;

    const layer = view.map.layers.getItemAt(0);
    if (layer) {
      layer.featureReduction = {
        type: "cluster",
        clusterRadius: "100px",
        labelingInfo: [{
          labelExpressionInfo: { expression: "$feature.cluster_count" },
          labelPlacement: "center-center",
          symbol: {
            type: "text",
            color: "white",
            font: { weight: "bold", size: "12px" }
          }
        }]
      };
    }
    view.goTo({ center: [-98, 39], zoom: 4 });
  };

  console.log(handleViewReady);

  useEffect(() => {
  }, []);

  return (
    <StyledPegaExtensionsArcgismapWrapper>
      <ArcgisMap itemId="d5dda743788a4b0688fe48f43ae7beb9">
        <ArcgisSearch position="top-right"></ArcgisSearch>
        <ArcgisLegend position="bottom-left"></ArcgisLegend>
      </ArcgisMap>

      {
        /*
        <arcgis-map style={{ height: "600px" }} item-id="02b37471d5d84cacbebcccd785460e94" onarcgisViewReadyChange={handleViewReady}>
          <arcgis-zoom slot="top-left" />
        </arcgis-map>
        */
      }
    </StyledPegaExtensionsArcgismapWrapper>
  );

}

export default withConfiguration(PegaExtensionsArcgismap);
