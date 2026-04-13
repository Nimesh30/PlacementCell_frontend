import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

  username = localStorage.getItem("username");

  constructor(private router: Router) { }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}