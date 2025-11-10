import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {
  private baseUrl = `${environment.apiUrl}/reception`;

  constructor(private http: HttpClient) {}

  register(dto: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, dto);
  }
}
