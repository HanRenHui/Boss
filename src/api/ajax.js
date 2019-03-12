import axios from 'axios'
export default function ajax(url, params = {}, method = 'GET') {
  method = method.toLowerCase()
  let promise
  return new Promise((resolve, reject) => {
    if(method === 'get') {
      promise = axios({
        url: `${url}?${formatData(params)}`,
        withCredentials: true,
        method
      })
    }else if(method === 'post') {
      promise = axios({
        url,
        data: params,
        withCredentials: true,
        method
      })
    }
    promise.then(data => {
      resolve(data)
    })
  })
}

function formatData(dataObj) {
  let tempArr = []
  for(let key in dataObj) {
    tempArr.push(`${key}=${dataObj[key]}`)
  }
  return tempArr.join('&')
}