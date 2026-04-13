import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  //  Skip ALL login APIs
  if (
    req.url.includes('/api/auth/loginUser') ||
    req.url.includes('/admin/login') ||
    req.url.includes('/api/auth/change-password') ||
    req.url.includes('/api/auth/forgotPassword') ||
    req.url.includes('/api/auth/reset-password')
  ){
    return next(req);
  }

  let clonedRequest = req;

  //  Attach token if exists
  if (token) {
    clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(clonedRequest).pipe(

   catchError((error) => {

  console.log("API ERROR:", error);

  if (error.status === 401) {

    const role = localStorage.getItem('role'); //  GET FIRST

    localStorage.clear(); //  THEN CLEAR

    //  Correct redirect
    if (role === 'ADMIN') {
      window.location.href = '/adminlogin';
    } else {
      window.location.href = '/login';
    }
  }

  return throwError(() => error);
})
  );
};