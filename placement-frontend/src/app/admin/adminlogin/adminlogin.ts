import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environment';

@Component({
  selector: 'app-adminlogin',
  imports: [RouterLink,FormsModule],
  templateUrl: './adminlogin.html',
  styleUrl: './adminlogin.css',
})
export class Adminlogin {

    email: string = '';
    password: string = '';
    
    constructor(private router: Router, private http: HttpClient,private toastr:ToastrService) {}

    login() {

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>(`${environment.apiUrl}/admin/login`, loginData)
      .subscribe({
       next: (response) => {

      localStorage.setItem("token", response.token);
      localStorage.setItem("role",response.Role);  
      localStorage.setItem("username", response.username);
      // localStorage.setItem("userEmail", response.email);

      if (response.firstLogin) {
      this.router.navigate(['/change-password']);
    } 
    else {
      this.router.navigate(['/adminlayout/admindashboard']);
    }
      } ,
    
        error: (error) => {

          if (error.status === 401) {
         this.toastr.error("Invalid Credentials");
          } else {
            this.toastr.error("Something went wrong. Try again.");
          }

        }
      });
  }
    
      
   
    toHome(){
      this.router.navigate(['/']);
    }


}
