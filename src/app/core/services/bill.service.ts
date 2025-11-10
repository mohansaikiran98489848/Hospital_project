import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BillHeaderDto, BillReceiptDto } from '../models/bill.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private baseUrl = `${environment.apiUrl}/BillHeaders`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<BillHeaderDto[]> {
    return this.http.get<BillHeaderDto[]>(this.baseUrl);
  }

  get(id: number): Observable<BillHeaderDto> {
    return this.http.get<BillHeaderDto>(`${this.baseUrl}/${id}`);
  }

 getReceipts(headerId: number): Observable<BillReceiptDto[]> {
  return this.http.get<BillReceiptDto[]>(`${environment.apiUrl}/BillReceipts?billHeaderId=${headerId}`);
}

  add(dto: BillHeaderDto): Observable<any> {
    return this.http.post(this.baseUrl, dto);
  }

  update(id: number, dto: BillHeaderDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
