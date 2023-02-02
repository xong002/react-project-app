import "./GetAddress.css";

import { useState, useEffect } from "react";

import OneMapAPI from "../api/OneMapAPI";

function GetAddress({ Lat, Long }) {

    const OneMapToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjk2NTksInVzZXJfaWQiOjk2NTksImVtYWlsIjoieG9uZzAwMkBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvb20yLmRmZS5vbmVtYXAuc2dcL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE2NzUzNTEyMDcsImV4cCI6MTY3NTc4MzIwNywibmJmIjoxNjc1MzUxMjA3LCJqdGkiOiI2Nzg4Mzg3MmUzNDg0YWUxODE4ZjUxMGE2M2I1MDA0ZiJ9.JIx325C3ZK7o4VbAOkt0nmochlY4uCDv9FTP4ANtEH8"
    // token expires Sunday, February 5, 2023 11:20:07 PM

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