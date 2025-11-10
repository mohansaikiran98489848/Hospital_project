export interface ConsultationDto {
  consultationId: number;
  patientId: number;
  patientName?: string | null;
  doctorId: number;
  doctorName?: string | null;
  serviceId: number;
  serviceName?: string | null;
  departmentName?: string | null; // ✅ NEW
  consultationDate?: string | null;
  fee?: number | null;
  notes?: string | null;
}
