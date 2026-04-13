import { Component } from '@angular/core';
import { RouterOutlet,RouterLinkActive,RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './layout.html',
  standalone:true,
  styleUrl: './layout.css',
})
export class Layout {
    username: string | null = '';

    ngOnInit() {
      this.username = localStorage.getItem("username");   
   }
  constructor(private router: Router) { }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
   }
}
