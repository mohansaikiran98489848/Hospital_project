import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DoctorDto } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private baseUrl = `${environment.apiUrl}/doctors`;

  constructor(private http: HttpClient) {}

 getPaged(page: number = 1, pageSize: number = 10, search: string = ''): Observable<{ totalCount: number; data: DoctorDto[] }> {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    search: search
  });
  return this.http.get<{ totalCount: number; data: DoctorDto[] }>(`${this.baseUrl}?${params.toString()}`);
}

  get(id: number): Observable<DoctorDto> {
    return this.http.get<DoctorDto>(`${this.baseUrl}/${id}`);
  }

  add(dto: DoctorDto): Observable<any> {
    return this.http.post(this.baseUrl, dto);
  }

  update(id: number, dto: DoctorDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getByDepartment(departmentId: number): Observable<DoctorDto[]> {
  return this.http.get<DoctorDto[]>(`${this.baseUrl}?departmentId=${departmentId}`);
}

}
