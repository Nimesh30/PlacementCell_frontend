import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from 'app/Services/jobservice/jobservice';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-applymodal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applymodal.html',
  styleUrls: ['./applymodal.css']
})
export class Applymodal {

  @Input() student: any;
  @Input() job: any;

  @Output() close = new EventEmitter<void>();

  applied: boolean = false;

  constructor(private jobservice: JobService,private toastr:ToastrService) {}

  submitApplication() {

    if (!confirm('Are you sure you want to apply?')) {
      return;
    }

    const studentId = this.student.studentId;
    const jobId = this.job.id;

    console.log(studentId, jobId);

    this.jobservice.applyJob(studentId, jobId).subscribe({

      next: (res) => {
            this.toastr.success("Application submitted successfully")

        // change button state
        this.applied = true;
        this.close.emit()
      },

      error: (err) => {
        console.error(err);
        this.toastr.warning("You already applied for this job");
        this.close.emit()
      }

    });
  }

}