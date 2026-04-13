import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { JobService } from 'app/Services/jobservice/jobservice';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-myapplications',
  imports: [CommonModule, DatePipe],
  templateUrl: './myapplications.html',
  styleUrl: './myapplications.css',
})
export class Myapplications {

  constructor(public jobservice: JobService, private cdr: ChangeDetectorRef) { }

  studentId: string | null = null;

  applications: any[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 3;

  ngOnInit(): void {
    this.studentId = localStorage.getItem("studentId");

    if (this.studentId) {
      this.loadApplications();
    }
  }
  loadApplications() {
    if (!this.studentId) return;

    this.jobservice
      .getMyApplications(this.studentId, this.currentPage, this.pageSize)
      .subscribe({
        next: (res) => {

          this.applications = res.content;

          this.currentPage = res.number;   // important
          this.totalPages = res.totalPages;

          this.jobservice.setApplicationCount(res.totalElements);

          console.log("Current Page:", this.currentPage);
          console.log("Total Pages:", this.totalPages);
          this.cdr.detectChanges();

        },
        error: (err) => {
          console.error("Error fetching applications:", err);
        }
      });
  }

  nextPage() {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
      this.loadApplications();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadApplications();
    }
  }
}
