
class HttpException extends Error {
    status: number;
    msg: string;
    errors?: any[]
    constructor (status: number, msg: string = 'Something went wrong', errors?: any[]) {
      super()
      this.status = status
      this.msg = msg
      this.errors = errors
    }
}

export default HttpException
