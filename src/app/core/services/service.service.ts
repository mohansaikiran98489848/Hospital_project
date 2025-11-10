import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ServiceDto } from '../models/service.model';

@Injectable({ providedIn: 'root' })
export class ServiceService {
  private baseUrl = `${environment.apiUrl}/services`;

  constructor(private http: HttpClient) {}

  getPaged(page = 1, pageSize = 10, search = ''):
    Observable<{ totalCount: number; data: ServiceDto[] }> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);
    if (search?.trim()) params = params.set('search', search.trim());
    return this.http.get<{ totalCount: number; data: ServiceDto[] }>(this.baseUrl, { params });
  }

  getAll(): Observable<ServiceDto[]> {
    return this.http.get<ServiceDto[]>(this.baseUrl); // kept for any other use
  }
  get(id: number): Observable<ServiceDto> {
    return this.http.get<ServiceDto>(`${this.baseUrl}/${id}`);
  }
  add(dto: ServiceDto) { return this.http.post(this.baseUrl, dto); }
  update(id: number, dto: ServiceDto) { return this.http.put(`${this.baseUrl}/${id}`, dto); }
  delete(id: number) { return this.http.delete(`${this.baseUrl}/${id}`); }
}
