import { Component,signal,computed, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewJobModal } from 'app/user/addnewjobmodal/addnewjobmodal';
import { JobService } from 'app/Services/jobservice/jobservice';
import { HttpClient } from '@angular/common/http';
import { HostListener } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-managejobs',
  standalone: true,
  imports: [CommonModule, AddNewJobModal],
  templateUrl: './managejobs.html',
  styleUrl: './managejobs.css',
})
export class Managejobs {

  @Input() jobData :any=null;
  // @Output() close = new EventEmitter<void>();
  // Signals
  jobs = signal<any[]>([]);
  totaljobs = signal(0);
  searchText = signal('');
  currentPage = signal(0);
  totalPages = signal(0);
  pageSize = 3;
  filterType = signal<'all' | 'active' | 'expired'>('all');
  // Modal control
  isOpen = false;
  selectedJob: any = null; // Pass job data to modal if editing

  constructor(
    private jobService: JobService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    public sanitizer: DomSanitizer,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  
updateFilter(event: Event) {
  const value = (event.target as HTMLSelectElement).value;

  console.log("Selected Filter:", value); // 

  this.filterType.set(value as any);
  this.currentPage.set(0);
  this.loadJobs(this.searchText()); 
}

  // Load jobs from backend
  loadJobs(keyword: string = '') {
  this.jobService
    .getAllJobs(
      keyword,
      this.currentPage(),
      this.pageSize,
      this.filterType()   //  send filter to backend
    )
    .subscribe((data: any) => {
      // console.log("jobs"+data)
      this.jobs.set(data.content);
      this.totaljobs.set(data.totalElements);
      this.totalPages.set(data.totalPages);
    });
}

  // Search
 updateSearch(event: Event) {
  const input = event.target as HTMLInputElement;
  this.searchText.set(input.value);
  this.currentPage.set(0);

  clearTimeout((this as any).searchTimeout);

  (this as any).searchTimeout = setTimeout(() => {
    this.loadJobs(input.value);
  }, 300);
}

  // Pagination
  nextPage() {
    if (this.currentPage() < this.totalPages() - 1) {
      this.currentPage.set(this.currentPage() + 1);
      this.loadJobs(this.searchText());
    }
  }

  prevPage() {
    if (this.currentPage() > 0) {
      this.currentPage.set(this.currentPage() - 1);
      this.loadJobs(this.searchText());
      this.cdr.detectChanges();
    }
  }

  // Toggle job description
  toggleDescription(job: any) {
    job.showDescription = !job.showDescription;
  }

  // Open Add Job modal
  openAddnewjobModal() {
    this.selectedJob = null;
    this.isOpen = true;
  }

  // Edit job
  editJob(job: any, event: Event) {
    event.stopPropagation();
    job.showMenu=false;
    this.selectedJob = job;
    this.isOpen = true;
  }

  // Delete job
  deleteJob(jobId: number, event: Event,job:any) {
    event.stopPropagation();
    job.showMenu=false;
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobService.deleteJob(jobId).subscribe({
        next: () => {
          this.toastr.success('Job deleted successfully ');
          this.loadJobs(this.searchText());
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Delete failed');
        }
      });
    }
  }

  // Download students applied
  downloadStudents(jobId: number, companyName: string) {
    this.jobService.exportStudents(jobId).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = companyName + '.xlsx';
      a.click();  
      window.URL.revokeObjectURL(url);
    });
  }

  // 3-dot menu toggle
  toggleJobMenu(job: any, event: Event) {
    event.stopPropagation();
    this.jobs().forEach(j => j.showMenu = false);
    job.showMenu = !job.showMenu;
  }

  // Close all menus when clicking outside
  @HostListener('document:click', ['$event'])
  closeMenu(event: any) {
    if (!event.target.closest('.action-menu')) {
      this.jobs().forEach(j => j.showMenu = false);
    }
  }

  closeModal() {
    this.isOpen = false;
    this.selectedJob = null;
    this.currentPage.set(0);
     this.loadJobs(this.searchText());
  }

}