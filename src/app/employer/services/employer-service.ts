import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreditCard } from '../../shared/models/creditCard.model';
import { Bank } from '../../shared/models/bank.model';
import { PlanAdmin } from '../../shared/models/planAdmin.model';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {


  private base_url = `${environment.baseUrl}/api`;

  constructor(private http: HttpClient) {}

 

  getCategory() {
    console.log('Fetching categories of job: ', `${this.base_url}/auth/category`);
    return this.http.get<any[]>(`${this.base_url}/auth/category`);
  }


  getLocations() {
    return this.http.get<any[]>(`${this.base_url}/auth/locations`);
  }

  getJobType() {
    return this.http.get<any[]>(`${this.base_url}/auth/type/job_type`);
  }

  getSkills() {
    return this.http.get<any[]>(`${this.base_url}/auth/skills`);
  }

  postJob(data: any): Observable<any>  {
    return this.http.post(`${this.base_url}/jobs/add-job`, data);
  }
  getPlanById(id: number): Observable<PlanAdmin> {
    return this.http.get<any>(`${this.base_url}/employer/plan/${id}`);
  }

  getAllPlans(): Observable<any> {
    return this.http.get(`${this.base_url}/employer/view-plans`);
  }

  addCard(card: CreditCard, userId: number, subscriptionId?: number): Observable<CreditCard> {
    return this.http.post<CreditCard>(
      `${this.base_url}/add?userId=${userId}&subscriptionId=${subscriptionId || ''}`,
      card
    );
  }

  getSavedCards(userId: number): Observable<CreditCard[]> {
    return this.http.get<CreditCard[]>(`${this.base_url}/${userId}/card`);
  }

   saveBank(bankName: string, userId: number, subscriptionId: number): Observable<any> {
    return this.http.post<any>(
      `${this.base_url}/save?bankName=${bankName}&userId=${userId}&subscriptionId=${subscriptionId}`,
      {}
    );
  }

  getBanks(userId: number): Observable<Bank[]> {
    return this.http.get<Bank[]>(`${this.base_url}/${userId}/bank`);
  }
  

}
