import { useEffect } from "react";
import { useMap } from "react-leaflet";

function SetView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, zoom)
    }, [center, map, zoom]);
}

export default SetView; 