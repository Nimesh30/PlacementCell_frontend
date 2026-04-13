import { Component } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { email } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environment';
@Component({
  selector: 'app-register',
  imports: [RouterLink,FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

    constructor(private router:Router ,private http:HttpClient,private toastr:ToastrService){

    }

    email: string = '';
    username: string = '';
    studentId:string =''


    register() {
      console.log(this.studentId)
    const registerData = {
      username: this.username,
      studentId:this.studentId,
      email: this.email
      

    };

      console.log(registerData)

    this.http.post(`${environment.apiUrl}/api/auth/register`, registerData)
.subscribe({
  next: (response: any) => {
    // alert(response.message); 
    this.toastr.show(response.message)

    this.router.navigate(['/login'])
  },
  error: (error) => {
    console.log("Full error:", error);

    //  Show backend message properly
    if (error.error && error.error.message) {
      // alert(error.error.message);
      this.toastr.show(error.error.message)
    } else {
      // alert("Registration failed - May be studentID duplicate...");
      this.toastr.warning("Registration failed")
    }
  }
});
}

  

    toLogin(){
      this.router.navigate(['/login'])
    }

    toHome(){
      this.router.navigate(['/'])
    }
}
