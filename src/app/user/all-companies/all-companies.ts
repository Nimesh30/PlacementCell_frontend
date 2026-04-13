import { Component, OnInit, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from '../../environment';

@Component({
  selector: 'app-all-companies',
  standalone: true,
  imports: [CommonModule, FormsModule],
    templateUrl: './all-companies.html',
    styleUrl: './all-companies.css',
})
export class AllCompanies implements OnInit {
  students: any[] = [];
  filteredStudents: any[] = [];
  searchText: string = "";
  filterType: string = "all";
  placedCount = 0;
  notPlacedCount = 0;
  selectedStudent: any = null;
  showModal: boolean = false;
  years: number[] = [2025,2026];
  selectedYear: string = "all";

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.http
      .get<any[]>(`${environment.apiUrl}/students/getAllcompaniesVisited`)
      .subscribe(data => {

        this.students = data.map(item => ({
          companyName: item[0],
          jobTitle: item[1],
          deadline: item[2],
          packageLpa: item[3]
        }));


        this.years = [...new Set(
          this.students.map(s => new Date(s.deadline).getFullYear())
        )];
        this.filteredStudents = this.students;
        this.cdr.detectChanges()        
      });
  }

  
  // applyFilters() {
  //   this.filteredStudents = this.students.filter(company =>
  //     company.companyName.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //     company.jobTitle.toLowerCase().includes(this.searchText.toLowerCase())
  //   );
  // }
  applyFilters() {

    this.filteredStudents = this.students.filter(company => {

      const searchMatch =
        company.companyName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        company.jobTitle.toLowerCase().includes(this.searchText.toLowerCase());

      const companyYear = new Date(company.deadline).getFullYear();

      const yearMatch =
        this.selectedYear === "all" ||
        companyYear == Number(this.selectedYear)

      return searchMatch && yearMatch;
    });

  }
  setFilter(type: string) {
    this.filterType = type;
    this.applyFilters();
  }

  openStudent(student: any) {
    this.selectedStudent = student;
    this.showModal = true;
    console.log("Selected student:", student);
  }

  closeModal() {
    this.showModal = false;
    this.selectedStudent = null;
  }

}