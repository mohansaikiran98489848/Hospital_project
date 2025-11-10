export interface ServiceDto {
  serviceId: number;
  serviceName: string;
  fee: number;
  description?: string;
  typeId: number;
  typeName?: string;
  departmentId: number;
  departmentName?: string;
  doctorId: number;
  doctorName?: string;
  outsourceId?: number;
  outsourceName?: string;
}
