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
    console.log(url, params, 'inside get data')

    const response = await axios.get(url, params).catch((error) => {
      console.log('params' , params);
      hasError = isRealError(error);
      errorData = hasError && error.response?.data;
      console.log(errorData, hasError, error)
    });
    
    console.log(response);

    return hasError ? errorData : response?.data;
  }
  console.log(url, params)
  return getData();
}