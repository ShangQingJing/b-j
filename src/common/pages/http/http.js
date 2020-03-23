import axios from 'axios';
import {Apiurl} from '../api/api.js'
let Global = require('../Global/Global.js');
axios.defaults.timeout = 5000;

const request=(method,url,body,type)=>{
  method = method.toUpperCase();  //转为大写  目的更严谨
  if(type==undefined){
    type=0
  };
  if(method ==='GET'){
    body = undefined;
  };
  return axios ({
    method:method,
    url:`${Apiurl+url}`,
    data:body,
    headers:{
      'Content-Type':type==1 ? 'multipart/form-data':'application/json',
      'Authorization':localStorage.getItem('token'),
      'currentProjectId':localStorage.getItem('theirProjectId')
    }
  }).then(function(res){
    return res.data
  }).catch(function(error){
    return error
  })
}
export const get = (url,type) => request('GET',url,type);
export const post=(url,body,type)=>request('POST',url,body,type);