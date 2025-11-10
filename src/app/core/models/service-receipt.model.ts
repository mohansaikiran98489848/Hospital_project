export interface ServiceReceiptDto {
  serviceReceiptId: number;
  billHeaderId: number;
  serviceId: number;
  quantity?: number | null;
  amount: number;
}
