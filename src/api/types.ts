export type PaginateQuery<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};
/**
 * @description：request configuration
 */
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 500,
  OVERDUE = 401,
  TIMEOUT = 30000,
  TYPE = 'success',
}
export interface DataRow<T = any> {
  pageNum: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
  rows: T[];
}
export interface ResultData<T = any> {
  code: number;
  msg: string;
  data: T;
  success: boolean;
  time: string;
}
export interface Result {
  Status: number;
  Message: string;
}

// Request response parameters (including data)
export interface ResultData<T = any> extends Result {
  Data: T;
  Success: boolean;
}

export type DeviceInfo = {
  UUID: string;
  Platform: string;
  Version: string;
  Brand: string;
  Model: string;
  BundleId: string;
  BundleVersion: string;
};


export interface VersionInfo {
  Platform?: string;
  VersionNo?: string;
  BuildNum?: number;
  VersionDesc?: string;
  UpdateType?: string;
  Channel?: null;
  FileUrl?: null;
  Remark?: null;
  IsDeleted?: boolean;
  IsActive?: boolean;
  ImportDataId?: null;
  ModificationNum?: number;
  Tag?: number;
  GroupId?: null;
  CompanyId?: null;
  AuditStatus?: string;
  CurrentNode?: null;
  CreatedBy?: null;
  CreatedTime?: Date;
  UpdateBy?: null;
  UpdateTime?: null;
  ModuleCode?: null;
  ID?: string;
}