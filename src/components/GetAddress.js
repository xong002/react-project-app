import "./GetAddress.css";

import { useState, useEffect } from "react";

import OneMapAPI from "../api/OneMapAPI";

function GetAddress({ Lat, Long }) {

    const OneMapToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjk2NTksInVzZXJfaWQiOjk2NTksImVtYWlsIjoieG9uZzAwMkBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvb20yLmRmZS5vbmVtYXAuc2dcL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE2NzQ3NDIxODIsImV4cCI6MTY3NTE3NDE4MiwibmJmIjoxNjc0NzQyMTgyLCJqdGkiOiIwNGY2ZmYzYmFmNmJkNTI4MGNlYjMxOGNjYTk2ZDc2YSJ9.9qsdn88ctzTrfNd740awnuCSI28gVl8t2qophyQsBbo"
    // token expires Sunday, January 29, 2023 10:09:42 PM

    const [GeocodeInfo, setGeocodeInfo] = useState([]);

    const apiGetAddress = async () => {
        try {
            const response = await OneMapAPI.get(`/privateapi/commonsvc/revgeocode?location=${Lat},${Long}&token=${OneMapToken}`)
            let objectJSON = JSON.parse(response.request.responseText)
            setGeocodeInfo(objectJSON.GeocodeInfo)
            console.log(response.request.responseText)
        } catch (error) {
            console.log(error.message)
        }
    }
    let newRender = true;
    useEffect(() => {
        if (newRender) {
            apiGetAddress();
            // eslint-disable-next-line
            newRender = false;
        }
    }, [])

    return (
        <>
            {GeocodeInfo.map(data => {
                return (
                    <div key={data.id}>
                        <div className="popup-TaxiAvailable-GetAddress">Nearby Location: </div>
                        {(data.BUILDINGNAME === "null") ? null : (<div>{data.BUILDINGNAME}</div>)}
                        {(data.ROAD === "NIL") ? null : (<div>{data.BLOCK} {data.ROAD}</div>)}
                        {data.POSTALCODE && <div>SINGAPORE {data.POSTALCODE}</div>}
                    </div>
                )
            })}
        </>
    )
}

export default GetAddress; 