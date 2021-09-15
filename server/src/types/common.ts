export type BlocksQueryRequest = {
  limit: number;
  offset: number;
}

export type BlockByHashQueryRequest = {
  hash: string
}

export type TransactionByHashQueryRequest = {
  hash: string
}
