import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';

@Component({
  selector: 'app-dashboard-service',
  imports: [],
  templateUrl: './dashboard-service.html',
  styleUrl: './dashboard-service.css',
})


export class DashboardService {

  private baseUrlUser = `${environment.apiUrl}/api/userdetails`;
  constructor(private http:HttpClient){

  } 

  getUserDetails(){
    return this.http.get(`${this.baseUrlUser}/available`);
  }
}
