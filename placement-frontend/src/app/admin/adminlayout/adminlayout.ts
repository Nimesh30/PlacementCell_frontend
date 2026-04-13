import { Component } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlayout',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './adminlayout.html',
  styleUrls: ['./adminlayout.css']
})
export class Adminlayout {
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
