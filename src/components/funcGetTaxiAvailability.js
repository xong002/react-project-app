import LTAtaxiAPI from "../api/LTAtaxiAPI";

function funcGetTaxiAvailability(handler) {
    const taxiAPIGet = async () => {
        try {
            let taxiList = [];
            //testing
            const response = await LTAtaxiAPI.get()
            console.log(response.data);
            handler(response.data);

        } catch (error) {
            console.log(error.message)
            alert(`Unable to retrieve taxi availability information: ${error.message}`)
        }
    }
    taxiAPIGet();
}

export default funcGetTaxiAvailability;
