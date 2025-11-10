export interface OutsourceDto {
  outsourceId: number;
  outsourceName: string;
  contactPerson?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  contractStartDate?: string | null;
  contractEndDate?: string | null;
  isActive?: boolean | null;
  typeId?: number | null;
}
