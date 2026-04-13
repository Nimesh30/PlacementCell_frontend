import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../environment';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {

  email: string = "";

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  sendResetLink() {

    this.http.post(
      `${environment.apiUrl}/api/auth/forgotPassword?email=${this.email}`,
      {}
    )
      .subscribe({
        next: (res: any) => {
          this.toastr.show("Link sent to email")
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err)
          this.toastr.show("Error in send reset password")
        }
      });

  }

}