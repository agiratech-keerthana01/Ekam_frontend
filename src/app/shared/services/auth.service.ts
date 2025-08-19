import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private base_url = `${environment.baseUrl}/api/auth`;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    console.log('Loaded token:', token);
  }

  /** --- Login --- */
  login(data: any): Observable<any> {
    return this.http.post(`${this.base_url}/login`, data);
  }

  /** --- Candidate Registration --- */
  registerCandidate(payload: any): Observable<any> {
    return this.http.post(`${this.base_url}/register-candidate`, payload);
  }

  /** --- Employer Registration --- */
  registerEmployer(payload: any): Observable<any> {
    return this.http.post(`${this.base_url}/register-employer`, payload);
  }

  getServices() {
    console.log('Fetching services from:', `${this.base_url}/services`);
  return this.http.get<any[]>(`${this.base_url}/services`);
}

getServiceStatus() {
  console.log('Fetching service-status from:', `${this.base_url}/service-status`);
  return this.http.get<any[]>(`${this.base_url}/service-status`);
}

getRankings() {
  return this.http.get<any[]>(`${this.base_url}/ranks`);
}

getBranches() {
  console.log('Fetching branches from:', `${this.base_url}/branch`);
  return this.http.get<any[]>(`${this.base_url}/branch`);
}

  /** --- Send OTP --- */
  sendOtp(payload: any): Observable<any> {
    return this.http.post(`${this.base_url}/send-otp`, payload);
  }

  /** --- Verify OTP --- */
  otpVerify(payload: any): Observable<any> {
    return this.http.post(`${this.base_url}/verify-otp`, payload);
  }

  /** --- Setup Password (if backend requires) --- */
  setupPassword(payload: any): Observable<any> {
    return this.http.post(`${this.base_url}/setup-password`, payload);
  }


  
}
