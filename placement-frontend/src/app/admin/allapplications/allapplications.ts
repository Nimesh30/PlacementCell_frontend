import { Component, signal } from '@angular/core';
import { ApplicationsService } from 'app/Services/applications-service';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Toast, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-allapplications',
  standalone: true,
  imports: [DatePipe, FormsModule, TitleCasePipe,CommonModule],
  templateUrl: './allapplications.html',
  styleUrl: './allapplications.css',
})
export class Allapplications {

  totalApplication = localStorage.getItem('totalApplication');

  applications = signal<any[]>([]);
  companies = signal<any[]>([]);
  statuses = signal<string[]>([]);

  currentPage = signal(0);
  totalPages = signal(0);

  pageSize = 6;

  selectedCompany = signal('');
  selectedStatus = signal('');
  searchKeyword = signal('');

  selectedCount = signal(0);
  parentChecked: boolean = false;

  constructor(private appService: ApplicationsService,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.loadJobs();

    this.appService.getAllCompanies().subscribe((data: any) => {
      this.companies.set(["All", ...data]);
    });

    this.appService.getStatuses().subscribe((data: string[]) => {
      this.statuses.set(data);
    });
  }

  // 🔍 SEARCH
  onSearch(event: any) {
    this.searchKeyword.set(event.target.value);
    this.currentPage.set(0);
    this.loadJobs();
  }

  // 🏢 FILTER COMPANY
  filterByCompany(event: any) {
    this.selectedCompany.set(event.target.value);
    this.currentPage.set(0);
    this.loadJobs();
  }

  // 📊 FILTER STATUS
  filterByStatus(event: any) {
    this.selectedStatus.set(event.target.value);
    this.currentPage.set(0);
    this.loadJobs();
  }

  // 📥 LOAD DATA (IMPORTANT FIX HERE)
  loadJobs() {

    const status = this.selectedStatus()
      ? this.selectedStatus().toUpperCase()
      : '';

    this.appService.getStudentwithCompan(
      this.searchKeyword(),
      this.selectedCompany(),
      status,
      this.currentPage(),
      this.pageSize
    ).subscribe((data: any) => {

      // 🔥 FIX: normalize id + add checked
      this.applications.set(
        data.content.map((item: any) => ({
          ...item,
          id: item.applicationid,   //  IMPORTANT FIX
          checked: false
        }))
      );

      this.totalPages.set(data.totalPages);
    });
  }

  //  UPDATE STATUS
  updateStatus(status: string) {

    const selectedIds = this.applications()
      .filter(app => app.checked)
      .map(app => app.id);   //  now safe

    console.log("Payload:", { ids: selectedIds, status });

    if (selectedIds.length === 0) {
      alert("No students selected");
      return;
    }

    this.appService.updateApplicationStatus(selectedIds, status)
      .subscribe({
        next: () => {
          this.toastr.success("Status Updated ");

          this.clearSelection();
          this.loadJobs(); // refresh UI
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("Update failed ");
        }
      });
  }

  //  SELECT ALL
  onParentChange(event: any) {
    this.parentChecked = event.target.checked;

    this.applications().forEach(item => {
      item.checked = this.parentChecked;
    });

    this.updateSelectedCount();
  }

  //  CHILD CHECKBOX
  onChildChange() {
    this.parentChecked = this.applications().every(item => item.checked);
    this.updateSelectedCount();
  }

  //  COUNT
  updateSelectedCount() {
    const count = this.applications().filter(item => item.checked).length;
    this.selectedCount.set(count);
  }

  //  CLEAR
  clearSelection() {
    this.applications().forEach(item => item.checked = false);
    this.parentChecked = false;
    this.selectedCount.set(0);
  }

  // ⏭ PAGINATION
  nextPage() {
    if (this.currentPage() < this.totalPages() - 1) {
      this.currentPage.update(p => p + 1);
      this.loadJobs();
    }
  }

  prevPage() {
    if (this.currentPage() > 0) {
      this.currentPage.update(p => p - 1);
      this.loadJobs();
    }
  }
}