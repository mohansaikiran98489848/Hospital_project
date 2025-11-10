import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DepartmentDto {
  departmentId: number;
  departmentName: string;
  description?: string;
  typeId: number;
}

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private baseUrl = `${environment.apiUrl}/departments`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<DepartmentDto[]> {
  // Simple wrapper for compatibility
  return this.http.get<DepartmentDto[]>(this.baseUrl);
}

get(id: number): Observable<DepartmentDto> {
  return this.http.get<DepartmentDto>(`${this.baseUrl}/${id}`);
}

  getPaged(page = 1, pageSize = 10, search = ''):
    Observable<{ totalCount: number; data: DepartmentDto[] }> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);
    if (search?.trim()) params = params.set('search', search.trim());
    return this.http.get<{ totalCount: number; data: DepartmentDto[] }>(`${this.baseUrl}/paged`, { params });
  }

  add(dto: DepartmentDto): Observable<DepartmentDto> {
    return this.http.post<DepartmentDto>(this.baseUrl, dto);
  }

  update(id: number, dto: DepartmentDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  checkName(name: string, id?: number): Observable<boolean> {
    let params = new HttpParams().set('name', name);
    if (id) params = params.set('id', id);
    return this.http.get<boolean>(`${this.baseUrl}/check-name`, { params });
  }
}
