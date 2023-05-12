import { useState, useEffect, useContext } from "react";
import axios from "axios";



function isRealError(error) {
  return (
    !error.response ||
    error.response.status === 404 ||
    error.response.status === 401
  );
}


export default function useGet(url, params = null) {
  async function getData() {
    let errorData;
    let hasError = false;
    const config = {
      headers: {
        'Cache-Control': 'no-cache'
      }
    };
    
    const response = await axios.get(url, params, config).catch((error) => {
      hasError = isRealError(error);
      errorData = hasError && error.response?.data;
      console.log(errorData, hasError, error)
    });
    
    console.log(response);

    return hasError ? errorData : response?.data;
  }
  return getData();
}