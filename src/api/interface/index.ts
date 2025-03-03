export interface Result {
  Status: number;
  Message: string;
}

// Request response parameters (including data)
export interface ResultData<T = any> extends Result {
  Data: T;
  Success: boolean;
}
