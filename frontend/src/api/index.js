import http from './../utils/index';



/**
 * Get the home page list
 */
export const login=(data)=> {
    const {username,password} = data;
    return http("post", `/api/login?username=${username}&password=${password}`);
}
export const getHello=async()=>{
    console.log(123);
    return await http("get", '/api/home');
}
