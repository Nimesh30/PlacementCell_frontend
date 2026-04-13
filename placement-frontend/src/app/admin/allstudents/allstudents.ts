import { Component, OnInit, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from '../../environment';
// import { Studentmodal } from 'app/user/studentmodal/studentmodal';
import { Studentmodal } from 'app/studentmodal/studentmodal';
viewChild
Studentmodal
@Component({
  selector: 'app-allstudents',
  standalone: true,
  imports: [CommonModule, FormsModule, Studentmodal],
  templateUrl: './allstudents.html',
  styleUrls: ['./allstudents.css']
})
export class Allstudents implements OnInit {
  students: any[] = [];
  filteredStudents: any[] = [];
  searchText: string = "";
  filterType: string = "all";
  placedCount = 0;
  notPlacedCount = 0;
  selectedStudent: any = null;
  showModal: boolean = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.http.get<any[]>(`${environment.apiUrl}/admin/students`)
      .subscribe(data => {
        this.students = data;
        this.placedCount = this.students.filter(s => s.placed).length;
        this.notPlacedCount = this.students.filter(s => !s.placed).length;
        this.applyFilters();
        this.cdr.detectChanges();
      });
  }

  applyFilters() {
    this.filteredStudents = this.students.filter(student => {
      const searchMatch =
        student.username?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        student.studentId?.toLowerCase().includes(this.searchText.toLowerCase());

      let filterMatch = true;
      if (this.filterType === "selected") filterMatch = student.placed === true;
      if (this.filterType === "notPlaced") filterMatch = student.placed === false;

      return searchMatch && filterMatch;
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

  // exportStudents() {
  //   this.http.get("http://localhost:8085/admin/students/export", { responseType: 'blob' })
  //     .subscribe(blob => {
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = 'students.csv';
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //     });   

  //   }

  exportStudents() {
    let url = `${environment.apiUrl}/admin/export/students`;

    if (this.filterType === 'selected') {
      url += '?type=placed';
    } else if (this.filterType === 'notPlaced') {
      url += '?type=notPlaced';
    } else {
      url += '?type=all';
    }

    this.http.get(url, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'students.xlsx';
      link.click();
    });
  }
}