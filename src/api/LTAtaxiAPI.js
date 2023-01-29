import axios from "axios";

// const BASE_URL = "http://datamall2.mytransport.sg/ltaodataservice";
// const BASE_URL = "http://localhost:5050/"; //to bypass CORS using proxy server
// const CROSS_DOMAIN = "https://cors-anywhere.herokuapp.com";
// const REQUEST_URL = `${CROSS_DOMAIN}/${BASE_URL}`;
const BASE_URL = "https://api.data.gov.sg/v1/transport/taxi-availability";

const LTAtaxiAPI = axios.create({
    // baseURL: REQUEST_URL,
    baseURL: BASE_URL,
    // headers: {
    //     AccountKey: `${process.env.REACT_APP_LTA_API_KEY}`,
    //     accept: "application/json",
    // }
})

export default LTAtaxiAPI; 