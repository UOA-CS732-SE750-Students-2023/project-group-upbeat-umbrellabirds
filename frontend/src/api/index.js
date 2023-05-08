import http from './../utils/index';



/**
 * 获取首页列表
 */
export const login=(data)=> {
    const {username,password} = data;
    return http("post", `/api/login?username=${username}&password=${password}`);
}
export const getHello=async()=>{
    console.log(123);
    return await http("get", '/api/home');
}
