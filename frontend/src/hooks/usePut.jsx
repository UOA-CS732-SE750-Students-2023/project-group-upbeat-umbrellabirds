import { useState, useEffect, useContext } from "react";
import axios from "axios";



function isRealError(error) {
  return (
    !error.response ||
    error.response.status === 404 ||
    error.response.status === 401
  );
}

/**
 * Code below handles the server URL for axios calls when .env file is missing
 * When .env file is missing, React will take the proxy route as server URL as defined in package.json
 */
// if (process.env.REACT_APP_SERVER_URL === undefined) {
//     axios.defaults.baseURL = "/";
//   } else {
//     axios.defaults.baseURL = `${process.env.REACT_APP_SERVER_URL}`;
//   }



export default function usePut(url, body = null) {
  async function putData() {
    let errorData;
    let hasError = false;
    const config = {
      headers: {
        'Cache-Control': 'no-cache'
      }
    };
    

    const response = await axios.put(url, body, config).catch((error) => {
      console.log('here')
      hasError = isRealError(error);
      errorData = hasError && error.response?.data;
      console.log(errorData, hasError, error)
    });
    console.log(response);

    return hasError ? errorData : response?.data;
  }
  console.log(url, body)

  return putData();
}
