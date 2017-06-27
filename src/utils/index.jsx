/**
 * Created by hao.cheng on 2017/4/28.
 */
// 获取url的参数
import {BaseAjaxUrl} from "../config/index.js"
export const queryString = () => {
    let _queryString = {};
    const _query = window.location.search.substr(1);
    const _vars = _query.split('&');
    _vars.forEach((v, i) => {
        const _pair = v.split('=');
        if (!_queryString.hasOwnProperty(_pair[0])) {
            _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
        } else if (typeof _queryString[_pair[0]] === 'string') {
            const _arr = [ _queryString[_pair[0]], decodeURIComponent(_pair[1])];
            _queryString[_pair[0]] = _arr;
        } else {
            _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
        }
    });
    return _queryString;
};

export const toQueryString = (obj) =>{
    return obj ? Object.keys(obj).sort().map(function(key) {
            var val = obj[key];
            if (Array.isArray(val)) {
                return val.sort().map(function(val2) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
                }).join('&');
            }
            return encodeURIComponent(key) + '=' + encodeURIComponent(val);
        }).join('&') : '';
}

//ajax请求
export const Request = (url, params={}, method='POST') => {
  let isOk;
  let host = BaseAjaxUrl + url;
  return new Promise((resolve, reject) => {
    fetch(host, {
      method: method,
      mode:'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: toQueryString(params||{})
    })
    .then((response) => {
        if (response.ok) {
          isOk = true;
        } else {
          isOk = false;
        }
        return response.json();
      })
    .then((responseData) => {
        if (isOk) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};