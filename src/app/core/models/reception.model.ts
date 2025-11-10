export interface ReceptionDto {
  patientId: number;      // 0 for new patient
  patientName: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  serviceId?: number | null;
  paidAmount?: number | null;
  paymentMode?: string | null;
}
