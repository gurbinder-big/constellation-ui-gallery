import { useEffect } from 'react';
import { withConfiguration } from '@pega/cosmos-react-core';
import type { PConnFieldProps } from '../shared/PConnProps';
import '../shared/create-nonce';
import Map from './Map';

// import Graphic from "@arcgis/core/Graphic.js";
// import Point from "@arcgis/core/geometry/Point.js";
// import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";

import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-legend";
import "@arcgis/map-components/dist/components/arcgis-search";
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

  const handleViewReady = (event) => {
    const viewElement = event.target;
    const pointGraphic = new Graphic({
      geometry: point, // A point geometry
      symbol: markerSymbol // A symbol for drawing the point
    });

    viewElement.graphics.add(pointGraphic);
  };
  console.log(handleViewReady);

  useEffect(() => {
  }, []);

  return (
    <StyledPegaExtensionsArcgismapWrapper>
      <Map />
      <ArcgisMap itemId="d5dda743788a4b0688fe48f43ae7beb9"
      onArcgisViewReadyChange={handleViewReady}>
        <ArcgisSearch position="top-right"></ArcgisSearch>
        <ArcgisLegend position="bottom-left"></ArcgisLegend>
      </ArcgisMap>
    </StyledPegaExtensionsArcgismapWrapper>
  );

}

export default withConfiguration(PegaExtensionsArcgismap);
