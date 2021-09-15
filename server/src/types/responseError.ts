export interface ResponseError {
  statusCode: number
  code: string
  message: string
  details?: Array<{
    field: string,
    message: string,
    error?: string,
    dataPath?: string,
    params?: Record<string, string | string[]>,
  }>
}
