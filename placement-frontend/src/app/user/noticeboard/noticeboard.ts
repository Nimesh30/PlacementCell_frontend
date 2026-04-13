import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeService } from 'app/Services/noticeBoard/notice';
import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-noticeboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noticeboard.html',
  styleUrls: ['./noticeboard.css'], //  fix (plural)
})
export class Noticeboard implements OnInit {

  notices: any[] = [];

  constructor(private noticeService: NoticeService,private cdr:ChangeDetectorRef, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadNotices();
  }

  loadNotices() {
    this.noticeService.getNotices().subscribe({
      next: (data: any) => {
        this.notices = data.map((n: any) => ({
          ...n,
          expanded: false
        }));
        this.cdr.detectChanges()
      },
      error: (err) => {
        console.error("Error fetching notices", err);
      }
    });
  }

  toggleNotice(selected: any) {
    this.notices.forEach(n => {
      if (n !== selected) n.expanded = false;
    });
    selected.expanded = !selected.expanded;
  }

  isNew(notice: any): boolean {
    const now = new Date().getTime();
    const created = new Date(notice.createdAt).getTime();
    return (now - created) < (24 * 60 * 60 * 1000);
  }

  getPreviewText(message: string): string {
    // Strip HTML tags and get first 80 characters
    const stripped = message.replace(/<[^>]*>/g, '');
    return stripped.length > 80 ? stripped.substring(0, 80) + '...' : stripped;
  }
}