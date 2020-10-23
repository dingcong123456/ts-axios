import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHearders}  from './helpers/headers'
import { createError } from './helpers/error'

function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve,reject) => {
        const { data = null, url, method = 'get', headers, responseType,timeout } = config

        const request = new XMLHttpRequest()

        request.open(method.toUpperCase(), url, true)

        // 网络请求超时处理
        if(timeout) {
            request.timeout = timeout
        }

        // 返回值处理
        request.onreadystatechange = function handleLoad() {
            // readyState 状态改变时触发 onreadystatechange，readyState===4 时 请求done下载已完成
            if (request.readyState !== 4) {
                return
            }

            //网络错误或者超时错误的时候，status为 0
            if(request.status === 0) {
                return
            }

            const responseHeaders = parseHearders(request.getAllResponseHeaders())
            const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }
            handleResponse(response)
        }

        Object.keys(headers).forEach((name) => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name]
            } else {
                request.setRequestHeader(name, headers[name])
            }
        })

        request.send(data)

        request.onerror = function handleError() {
            reject(createError(
              'Network Error',
              config,
              null,
              request
            ))
          }
          
          request.ontimeout = function handleTimeout() {
            reject(createError(
              `Timeout of ${config.timeout} ms exceeded`,
              config,
              'ECONNABORTED',
              request
            ))
          }
          
          function handleResponse(response: AxiosResponse) {
            if (response.status >= 200 && response.status < 300) {
              resolve(response)
            } else {
              reject(createError(
                `Request failed with status code ${response.status}`,
                config,
                null,
                request,
                response
              ))
            }
          }
    })
}

export default xhr