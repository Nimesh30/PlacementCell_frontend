import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoticeService } from 'app/Services/noticeBoard/notice';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adminnoticeboard',
  standalone: true,
  imports: [CommonModule, FormsModule, CKEditorModule],
  templateUrl: './adminnoticeboard.html',
  styleUrls: ['./adminnoticeboard.css']
})
export class Adminnoticeboard implements OnInit {

  // public Editor: any = ClassicEditor;

  notices: any[] = [];

  showForm = false;
  isEditMode = false;
  content: string = '';
  public Editor: any = ClassicEditor;

  notice = {
    id: null as number | null,
    title: '',
    message: '',
    fileUrl: '',
    pinned: false
  };

  constructor(
    private noticeService: NoticeService,
    private cdr: ChangeDetectorRef,
    public sanitizer: DomSanitizer,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.loadNotices();
  }

  /* ---------------- LOAD NOTICES ---------------- */

  loadNotices() {
    this.noticeService.getNotices().subscribe({
      next: (data: any) => {

        console.log("API Response:", data);

        this.notices = data;
        
        // Force UI refresh
        this.cdr.detectChanges();

      },
      error: (err) => {
        console.error("Error loading notices", err);
      }
    });
  }

  /* ---------------- OPEN FORM ---------------- */

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.resetForm();
  }

  /* ---------------- CREATE / UPDATE ---------------- */

  submitNotice() {
    
    if (!this.notice.title || this.notice.title.trim().length < 3) {
      this.toastr.error("Title must be at least 3 characters");
      return;
    }


    if (this.isEditMode) {

      this.noticeService.updateNotice(this.notice.id!, this.notice)
        .subscribe({
          next: () => {
            this.toastr.success("Notice Updated");
            this.afterSubmit();
          },
          error: () => this.toastr.error("Error updating notice")
        });

    } else {

      this.noticeService.createNotice(this.notice)
        .subscribe({
          next: () => {
            this.toastr.success("Notice Created");
            this.afterSubmit();
          },
          error: () => this.toastr.error("Error creating notice")
        });

    }
  }

  /* ---------------- AFTER SUBMIT ---------------- */  

  afterSubmit() {
    this.closeForm();
    this.resetForm();
    this.loadNotices();
  }


  toggleNotice(selected: any) {
    this.notices.forEach(n => {
      if (n !== selected) n.expanded = false;
    });
    selected.expanded = !selected.expanded;
  }

  /* ---------------- EDIT ---------------- */

  editNotice(n: any) {
    this.notice = { ...n };
    this.isEditMode = true;
    this.showForm = true;
  }

  /* ---------------- DELETE ---------------- */

  deleteNotice(id: number) {

    if (confirm("Delete this notice?")) {

      this.noticeService.deleteNotice(id).subscribe({
        next: () => {
          this.toastr.success("Notice Deleted");
          console.log("after delete before loadNotice")
          this.loadNotices();
          console.log("after delete after loadNotice")
        },
        error: () =>{ this.toastr.error("Error deleting notice")
          console.log("In error ");
        }
      });
    }

  }

  /* ---------------- RESET ---------------- */

  resetForm() {
    this.notice = {
      id: null,
      title: '',
      message: '',
      fileUrl: '',
      pinned: false
    };

    this.isEditMode = false;
  }

  getPreviewText(message: string): string {
    // Strip HTML tags and get first 80 characters
    const stripped = message.replace(/<[^>]*>/g, '');
    return stripped.length > 80 ? stripped.substring(0, 80) + '...' : stripped;
  }

}