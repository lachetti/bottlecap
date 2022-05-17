export interface IResponseError {
  code: number;
  message: string;
}

export interface IResponse<T> {
  id: number;
  method: string;
  result?: T;
  error?: IResponseError;
}
