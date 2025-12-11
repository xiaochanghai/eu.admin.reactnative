import { Attachment } from "./attachment";

export type EquipmentStatus = 'running' | 'repairing' | 'fault';

export type Equipment = {
  ImageIds?: string[];
  Attachments?: Attachment[];
  RepairCount?: number;
  CurrentMonthRepairCount?: number;
  MaintenanceCount?: number;
  MaintenanceOrder?: null;
  RepairOrder?: null;
  UseManagerName?: null;
  StartDate1?: null;
  DeptName?: null;
  Runtime?: null;
  Health?: number;
  StatusText?: null;
  MachineType?: string;
  MachineNo?: string;
  MachineName?: string;
  MachineStatus?: null;
  UseDeptId?: null;
  UseManeageId?: null;
  RepairManeageId?: null;
  BrandModel?: string;
  Manufacturer?: string;
  Supplier?: string;
  Location?: string;
  AnnualInspection?: boolean;
  AnnualInspectionDate?: Date;
  CommissioningDate?: Date;
  StopDate?: Date;
  ImageId?: string;
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
  CreatedBy?: string;
  CreatedTime?: Date;
  UpdateBy?: string;
  UpdateTime?: Date;
  ModuleCode?: null;
  ID: string;
  RepairStats: EquipmentRepairStats[];
}
export type EquipmentRepairStats = {
  value: string;
  label: string;
  bgColor: string;
  textColor: string;
}