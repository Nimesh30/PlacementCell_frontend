import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) { }

  getDashboard() {
    console.log("GetDashBOard functojn",this.http.get(`${this.baseUrl}/dashboard`))
    return this.http.get(`${this.baseUrl}/dashboard`);
  }

}