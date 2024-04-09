import React, { useCallback, useEffect, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

function GoogleMap(){

    const mapRef = useRef(null);

    const initMap = useCallback(() => {
        new window.google.maps.Map(mapRef.current, {
            center: { lat: 37.481094, lng: 126.879298 },
            zoom: 15,
        });
    }, [mapRef]);

    useEffect(() => {
        initMap();
    }, [initMap]);

    return (
        <div
            className="map"
            style={{ width: "500px", height: "500px" }}
            ref={mapRef}
        ></div>
    );
}

export default GoogleMap