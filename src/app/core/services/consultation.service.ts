import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConsultationDto } from '../models/consultation.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private baseUrl = `${environment.apiUrl}/consultations`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ConsultationDto[]> {
    return this.http.get<ConsultationDto[]>(this.baseUrl);
  }

  get(id: number): Observable<ConsultationDto> {
    return this.http.get<ConsultationDto>(`${this.baseUrl}/${id}`);
  }

  add(dto: ConsultationDto): Observable<any> {
    return this.http.post(this.baseUrl, dto);
  }

  update(id: number, dto: ConsultationDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
