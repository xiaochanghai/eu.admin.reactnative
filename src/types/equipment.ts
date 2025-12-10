export type EquipmentStatus = 'running' | 'repairing' | 'fault';

export type Equipment = {
  Remark?: string;
  BrandModel?: string;
  StopDate?: string;
  ImageId?: string;
  AnnualInspectionDate?: string;
  UseDeptId?: string;
  MachineStatus?: string;
  Manufacturer?: string;
  AnnualInspection?: string;
  CommissioningDate?: string;
  UseManeageId?: string;
  Location?: string;
  Supplier?: string;
  RepairManeageId?: string;
  MachineNo?: string;
  MachineName?: string;
  MachineType?: string;
  Status: EquipmentStatus;
  HealthRate?: number;
  RepairCount?: number;
  ExtraInfo?: string;
  ID: string;
};
