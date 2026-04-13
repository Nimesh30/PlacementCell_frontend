  import { Component } from '@angular/core';
  import { Router, RouterLink } from '@angular/router';
  import { HttpClient } from '@angular/common/http';
  import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environment';

  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink, FormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css',
  })
  export class Login {

    email: string = '';
    password: string = '';

    constructor(private router: Router, private http: HttpClient,private toastr:ToastrService) {}
    login() {

  const loginData = {
    email: this.email,
    password: this.password
  };

  this.http.post<any>(`${environment.apiUrl}/api/auth/loginUser`, loginData)
    .subscribe({
      next: (response) => {

        console.log("Login API Response:", response);
        console.log("Full response:", response);        // see all keys
        console.log("Role value:", response.Role);      // is it undefined?
        console.log("Token value:", response.token); 
        console.log("login response in login page ",response.firstLogin);

        if (response.firstLogin === true) {
          localStorage.setItem("userEmail", this.email);
            
          this.router.navigate(['/change-password']);

        } else {
          this.router.navigate(['/layout/userdashboard']);
        }

        //  STORE TOKEN (IMPORTANT)
        localStorage.setItem("token", response.token);
        // localStorage.setItem('role', response.Role); 
        localStorage.setItem("role", response.Role.toUpperCase());

        // Existing data
        localStorage.setItem("username", response.username);
        localStorage.setItem("studentId", response.studentId);
        localStorage.setItem("collegeEmail", response.email);


      },

      error: (error) => {
        if (error.status === 401) {
          // alert("Invalid Credentials");
          this.toastr.error("Invalid Credentials")
        } else if (error.status === 404){
          this.toastr.error("User is not registred..")
        } else if (error.status === 500) {
          this.toastr.error("Email must be a valid Charusat email")
        } else {
          // alert("Something went wrong. Try again.");
          this.toastr.error("Something went wrong. Try again")
        }
      }
    });
}

    goToRegister(){
      this.router.navigate(['/register'],)
    }
  
  }

  
