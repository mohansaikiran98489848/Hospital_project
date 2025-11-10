import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PatientDto } from '../models/patient.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private baseUrl = `${environment.apiUrl}/patients`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PatientDto[]> {
    return this.http.get<PatientDto[]>(this.baseUrl);
  }

  get(id: number): Observable<PatientDto> {
    return this.http.get<PatientDto>(`${this.baseUrl}/${id}`);
  }

  add(dto: PatientDto): Observable<any> {
    return this.http.post(this.baseUrl, dto);
  }

  update(id: number, dto: PatientDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getPaged(search = '', page = 1, pageSize = 25): Observable<{ totalCount: number; patients: PatientDto[] }> {
  return this.http.get<{ totalCount: number; patients: PatientDto[] }>(
    `${this.baseUrl}?search=${search}&page=${page}&pageSize=${pageSize}`
  );
}
searchPatients(term: string) {
  const url = `${this.baseUrl}?search=${encodeURIComponent(term)}&page=1&pageSize=10`;
  return this.http
    .get<{ totalCount: number; patients: PatientDto[] }>(url)
    .pipe(map(r => r.patients));
}

}
