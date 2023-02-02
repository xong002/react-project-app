import { useMapEvents } from "react-leaflet";
import { useState } from "react";

function CurrentView({ center, setCenter, zoom, setZoom }) {
    // const [zoomLevel, setZoomLevel] = useState();

    const mapEvents = useMapEvents({
        // zoomend: () => {
        //     setZoom(mapEvents.getZoom());
        //     setCenter(mapEvents.getCenter());
        // },

        moveend: () => {
            // setCenter(mapEvents.getCenter()); //keeps returning getCenter. setCenter issue

            setZoom(mapEvents.getZoom());
            console.log(zoom, mapEvents.getCenter());
        },
    });

    console.log(center);

    return null
};
export default CurrentView;