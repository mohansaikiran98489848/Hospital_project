import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export abstract class BaseService {
  protected apiUrl = environment.apiUrl;
  constructor(protected http: HttpClient) {}
}
