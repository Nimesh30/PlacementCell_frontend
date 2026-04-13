import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admindashboard.html',
  styleUrls: ['./admindashboard.css']
})
export class Admindashboard implements OnInit {

  dashboardData: any;

  constructor(private adminService: AdminService,
    private cdr:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.adminService.getDashboard().subscribe({
      next: (data) => {
        console.log("Dashboard Data:", data);
        this.dashboardData = data;
        const dashboard = data as any;

      localStorage.setItem('totalApplication',dashboard.application.toString());

        this.cdr.detectChanges()
      },
      error: (err) => {
        console.error("Error fetching dashboard:", err);
      }
      
    });
  }

  isModalOpen = true; // Set to true to test, or false by default

  // Add this function to handle the (closeModal) event
  toggleModal() {
    this.isModalOpen = false;
  }

}