import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  

}
