class ErrorHandler extends Error {

  public statusCode: number
  public message: string

  constructor(statusCode?: number, message?: string) {
    super()
    this.statusCode = statusCode || 500
    this.message = message || 'Internal server error'
  }
}

export default ErrorHandler