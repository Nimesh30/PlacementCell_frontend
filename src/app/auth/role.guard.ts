import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";

export const roleGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role')?.toUpperCase();

  if (!token || !userRole) {
    router.navigate(['/']);
    return false;
  }

  const allowedRoles = route.data?.['roles'] as string[];

  console.log("User Role:", userRole);
  console.log("Allowed Roles:", allowedRoles);

  if (allowedRoles && allowedRoles.includes(userRole)) {
    return true;
  }

  console.log("Access denied");

  // Smart redirect
  if (userRole === 'ADMIN') {
    router.navigate(['/adminlayout/admindashboard']);
  } else if(userRole === 'STUDENT') {
    router.navigate(['/layout/userdashboard']);
  }
  else{
    router.navigate(['/']);
  }

  return false;
};