import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanAdmin } from '../../shared/models/planAdmin.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private base_url = `${environment.baseUrl}/api`;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.base_url}/auth/login`, data);
  }

  createSubscription(data: any): Observable<any> {
    return this.http.post(`${this.base_url}/admin/add-subscriptions`, data);
  }

  getAllSubscriptions(): Observable<any> {
    return this.http.get(`${this.base_url}/admin/subscriptions`);
  }

  updateSubscription(id: number, dto: Partial<PlanAdmin>): Observable<PlanAdmin> {
    return this.http.put<PlanAdmin>(`${this.base_url}/admin/update-subscriptions/${id}`, dto);
  }
}
