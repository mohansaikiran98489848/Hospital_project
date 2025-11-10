export interface DoctorDto {
  doctorId: number;
  doctorName: string;
  qualification?: string | null;
  phone?: string | null;
  email?: string | null;
  typeId?: number | null;
  departmentId?: number | null;
  departmentName?: string | null;
}
