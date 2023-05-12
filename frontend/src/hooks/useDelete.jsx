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



export default function useDelete(url, body = null) {
  async function deleteData() {
    let errorData;
    let hasError = false;


    const response = await axios.delete(url, body).catch((error) => {
      console.log('here')
      hasError = isRealError(error);
      errorData = hasError && error.response?.data;
      console.log(errorData, hasError, error)
    });
    console.log(response);

    return hasError ? errorData : response?.data;
  }

  return deleteData();
}
