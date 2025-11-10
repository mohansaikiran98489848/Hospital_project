export interface BillHeaderDto {
  billHeaderId: number;
  patientId: number;
  patientName?: string | null;
  consultationId?: number | null;
  billDate?: string | null; // ISO
  totalAmount?: number | null;
  status?: string | null;
}

export interface BillReceiptDto {
  billReceiptId: number;
  billHeaderId: number;
  paidAmount: number;
  paymentMode?: string | null;
  paymentDate?: string | null
}
