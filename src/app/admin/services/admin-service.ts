import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private base_url = `${environment.baseUrl}/api`;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
  }

  login(data: any): Observable<any> {
      return this.http.post(`${this.base_url}/auth/login`, data);
    }
  
}
