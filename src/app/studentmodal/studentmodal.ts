import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
EventEmitter
ElementRef
ViewChild
@Component({
  selector: 'app-studentmodal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './studentmodal.html',
  styleUrl: './studentmodal.css',
})
export class Studentmodal {

  @Input() student: any; // ✅ REQUIRED
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  getSelectedCompany(student: any): string {
  if (!student.applications) return 'N/A';

  const selectedApp = student.applications.find(
    (app: any) => app.status === 'SELECTED'
  );

  return selectedApp ? selectedApp.companyName : 'N/A';
}
}
