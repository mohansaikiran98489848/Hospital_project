import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TypeDto, PagedResult } from '../models/type.model';

@Injectable({ providedIn: 'root' })
export class TypeService {
  private baseUrl = `${environment.apiUrl}/type`;

  constructor(private http: HttpClient) {}

  // parents dropdown / full list
  getAll(): Observable<TypeDto[]> {
    return this.http.get<TypeDto[]>(this.baseUrl);
  }

  // paged + search
  getPaged(page: number = 1, pageSize: number = 10, search: string = ''): Observable<PagedResult<TypeDto>> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);
    if (search?.trim()) params = params.set('search', search.trim());
    return this.http.get<PagedResult<TypeDto>>(`${this.baseUrl}/paged`, { params });
  }

  get(id: number): Observable<TypeDto> {
    return this.http.get<TypeDto>(`${this.baseUrl}/${id}`);
  }

  add(dto: TypeDto): Observable<TypeDto> {
    return this.http.post<TypeDto>(this.baseUrl, dto);
  }

  update(id: number, dto: TypeDto): Observable<TypeDto> {
    return this.http.put<TypeDto>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
