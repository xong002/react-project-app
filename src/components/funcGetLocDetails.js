import OneMapAPI from "../api/OneMapAPI";

function funcGetLocDetails([lat, long], handler) {

    const searchParams = {
        latitude: lat,
        longitude: long,
        buffer: 10,
        addressType: "All",
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjk2NTksInVzZXJfaWQiOjk2NTksImVtYWlsIjoieG9uZzAwMkBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvb20yLmRmZS5vbmVtYXAuc2dcL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE2NzUzNTEyMDcsImV4cCI6MTY3NTc4MzIwNywibmJmIjoxNjc1MzUxMjA3LCJqdGkiOiI2Nzg4Mzg3MmUzNDg0YWUxODE4ZjUxMGE2M2I1MDA0ZiJ9.JIx325C3ZK7o4VbAOkt0nmochlY4uCDv9FTP4ANtEH8"
        // token expires Sunday, February 5, 2023 11:20:07 PM
    }

    let resultList = [];

    const apiGet = async () => {

        try {
            const response = await OneMapAPI.get(`/privateapi/commonsvc/revgeocode?location=${searchParams.latitude},${searchParams.longitude}&token=${searchParams.token}&buffer=${searchParams.buffer}&addressType=${searchParams.addressType}`)

            const convertResults = { ...response.data.GeocodeInfo }
            console.log(convertResults);


            for (const [details] of Object.entries(convertResults)) {

                let result = {
                    ADDRESS: null,
                    BLOCK: null,
                    BUILDINGNAME: null,
                    ROAD: null,
                    POSTALCODE: null,
                    LATITUDE: null,
                    LONGITUDE: null
                }
                for (const [key, value] of Object.entries(details)) {
                    result[key] = value
                    console.log(`${key}: ${value}`);
                }

                if (result.ADDRESS === null) {

                    let address;

                    if (result.BLOCK !== null && result.BLOCK !== "null" && result.BLOCK !== "NIL") address = result.BLOCK
                    if (result.ROAD !== null && result.ROAD !== "null" && result.ROAD !== "NIL") address = address + " " + result.ROAD
                    if (result.BUILDINGNAME !== null && result.BUILDINGNAME !== "null" && result.BUILDINGNAME !== "NIL") address = address + " " + result.BUILDING
                    if (result.POSTALCODE !== null && result.POSTALCODE !== "null" && result.POSTALCODE !== "NIL" && result.POSTALCODE !== "") address = address + " SINGAPORE " + result.POSTALCODE

                    address = address.replace("undefined", "")
                    address = address.replace("null", "")

                    result.ADDRESS = address;
                }

                resultList = [...resultList, result]
            }

            console.log(resultList);
            handler(0, resultList[0]);

        } catch (error) {
            console.log(error.message);
        }
    }

    apiGet();
}

export default funcGetLocDetails;