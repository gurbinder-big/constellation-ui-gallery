import { useRef, useEffect } from 'react';
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const MapComponent = () => {

  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      const webmap = new Map({
        basemap: "dark-gray-vector"
      });

      const view = new MapView({
        container: mapDiv.current,
        map: webmap,
        center: [-117.1490,32.7353],
        scale: 10000000
      });

      return () => view && view.destroy()
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv} style={{height: '100vh', width: "100%"}}></div>;
}

export default MapComponent;
