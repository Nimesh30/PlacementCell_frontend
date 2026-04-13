// 





//chatgpt



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environment';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePassword implements OnInit {

  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  token: string | null = null;
  isResetMode: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    // Check if reset password token exists in URL
    this.token = this.route.snapshot.paramMap.get('token');

    if (this.token) {
      this.isResetMode = true;
    } else {
      // First time login flow
      this.email = localStorage.getItem("userEmail") || '';
    }
  }

  submitPasswordChange() {

    const newPassword = this.newPassword.trim();
    const confirmPassword = this.confirmPassword.trim();

    // Check password match
    if (newPassword !== confirmPassword) {
      this.toastr.error("Passwords do not match!");
      return;
    }

    // Password strength validation
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordPattern.test(newPassword)) {
      this.toastr.error(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    // RESET PASSWORD FLOW (via email link)
    if (this.isResetMode) {

      const resetData = {
        token: this.token,
        newPassword: newPassword,
        newPasswordConfirm: confirmPassword
      };

      this.http.post(`${environment.apiUrl}/api/auth/reset-password`, resetData)
        .subscribe({
          next: () => {
            this.toastr.success("Password reset successfully!");
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error(err);
            this.toastr.error("Failed to reset password. The link might be expired.");
          }
        });

    }

    // FIRST LOGIN CHANGE PASSWORD FLOW
    else {

      const changeData = {
        email: this.email.trim(),
        newPassword: newPassword,
        newPasswordConfirm: confirmPassword
      };

      console.log("Change Password Request:", changeData);

      this.http.post(`${environment.apiUrl}/api/auth/change-password`, changeData)
        .subscribe({
          next: () => {
            this.toastr.success("Password changed successfully!");
            localStorage.removeItem("userEmail");
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error(err);
            this.toastr.error("Failed to change password. Try again.");
          }
        });

    }
  }
}