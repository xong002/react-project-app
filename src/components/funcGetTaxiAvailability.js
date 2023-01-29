import LTAtaxiAPI from "../api/LTAtaxiAPI";

function funcGetTaxiAvailability(handler) {
    const taxiAPIGet = async () => {
        try {
            let taxiList = [];
            //testing
            const response = await LTAtaxiAPI.get()
            const coordinates = response.data.features[0].geometry.coordinates;
            for (let i = 0; i < coordinates.length; i++) {
                const latlongcoord = { "Longitude": coordinates[i][0], "Latitude": coordinates[i][1] }
                taxiList = [...taxiList, latlongcoord]
            }
            console.log(taxiList.length);
            handler(taxiList);

        } catch (error) {
            console.log(error.message)
            alert(`Unable to retrieve taxi availability information: ${error.message}`)
        }
    }
    taxiAPIGet();
}

export default funcGetTaxiAvailability;
