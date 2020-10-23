import { AxiosRequestConfig, AxiosResponse } from '../types'

class AxiosError extends Error {
    isAxiosError: boolean
    config: AxiosRequestConfig
    code?: string | null
    request?: any
    response?: AxiosResponse

    constructor(
        message: string,
        config: AxiosRequestConfig,
        code?: string | null,
        request?: any,
        response?: AxiosResponse) {
        super(message)

        this.config = config
        this.code = code
        this.request = request
        this.response = response
        this.isAxiosError = true

        //typescript 继承原生类型时 使用的 new.target 编译目标为es5时 会找不到new.target
        Object.setPrototypeOf(this, AxiosError.prototype)
    }
}

export function createError(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ): AxiosError {
    const error = new AxiosError(message, config, code, request, response)
  
    return error
  }