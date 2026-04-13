import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environment';

@Component({
  selector: 'myprofile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './myprofile.html',
  styleUrls: ['./myprofile.css']
})
export class Myprofile implements OnInit {

  academicForm!: FormGroup;
  selectedFile: File | null = null;
  isEditMode = false;
  isFormEditable = false;
  profile: any;

  baseUrl = `${environment.apiUrl}/students`;

  constructor(private fb: FormBuilder, private http: HttpClient, 
    private cdr: ChangeDetectorRef,
  private toastr:ToastrService) { }

  ngOnInit(): void {

    this.academicForm = this.fb.group({

      studentId: [{ value: '', disabled: true }],
      collegeEmail: [{ value: '', disabled: true }],

      fullName: [{ value: '', disabled: true }, Validators.required],
      personalEmail: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      mobileNumber: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      tenthMarks: [{ value: '', disabled: true }, [Validators.required, Validators.min(0), Validators.max(100)]],
      twelfthMarks: [{ value: '', disabled: true }, [Validators.required, Validators.min(0), Validators.max(100)]],
      stream: [{ value: '', disabled: true }, Validators.required],
      branch: [{ value: '', disabled: true }, Validators.required],
      bachelorsCgpa: [{ value: '', disabled: true }, [Validators.required, Validators.min(0), Validators.max(10)]],
      mastersCgpa: [{ value: '', disabled: true }],
      institute: [{ value: '', disabled: true }, Validators.required],
      department: [{ value: '', disabled: true }, Validators.required],
      passingYear: [{ value: '', disabled: true }, Validators.required]

    });

    const studentId = localStorage.getItem('studentId');

    if (studentId) {
      this.fetchProfile(studentId);
    } else {
      this.toastr.error("Student not logged in");
    }
  }

  // ================= ENABLE FORM =================

  enableForm() {
    Object.keys(this.academicForm.controls).forEach(key => {
      if (key !== 'studentId' && key !== 'collegeEmail') {
        this.academicForm.get(key)?.enable();
      }
    });
    this.isFormEditable = true;
  }

  // ================= DISABLE FORM =================

  disableForm() {
    Object.keys(this.academicForm.controls).forEach(key => {
      this.academicForm.get(key)?.disable();
    });
    this.isFormEditable = false;
  }

  // ================= FETCH PROFILE =================

  fetchProfile(studentId: string) {
    console.log("In fetch profile...", studentId)
    this.http.get<any>(`${this.baseUrl}/profile/${studentId}`)
      .subscribe({
        next: (response) => {
          console.log("API Response with null first time", response)

          if (response.imageUrl === "null") {

            response.imageUrl = null;
          }

          this.profile = response;
          this.isEditMode = true;

          this.academicForm.patchValue(response);
          this.cdr.detectChanges();
          this.disableForm();   // disable after loading

        },

        error: () => {

          // First time user
          this.isEditMode = false;

          this.academicForm.patchValue({
            studentId: studentId,
            collegeEmail: localStorage.getItem('collegeEmail')
          });

          this.enableForm();   // allow new user to fill form
        }

      });
  }

  // ================= FILE CHANGE =================

  onFileChange(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // ================= SAVE / UPDATE =================

  onSave(): void {

  if (!this.isFormEditable) {
    this.enableForm();
    return;
  }

  if (this.academicForm.invalid) {
    this.academicForm.markAllAsTouched();
    return;
  }

  const studentId = localStorage.getItem('studentId');
  if (!studentId) {
    this.toastr.error("Student not logged");
    return;
  }

  const rawData = this.academicForm.getRawValue();
  const formData = new FormData();

  //  IMPORTANT FIX (SEND JSON AS BLOB)
  const profileBlob = new Blob(
    [JSON.stringify(rawData)],
    { type: 'application/json' }
  );

  formData.append('profile', profileBlob);

  //  File
  if (this.selectedFile) {
    formData.append('file', this.selectedFile);
  }

  if (this.isEditMode) {

    this.http.post(`${this.baseUrl}/add/${studentId}`, formData)
      .subscribe({
        next: () => {
          this.toastr.success("Profile saved successfully!");
          this.isEditMode = true;
          this.disableForm();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("Error saving profile");
        }
      });
                      
  }
}

  // ================= CANCEL =================

  onCancel(): void {

    this.selectedFile = null;

    if (this.profile) {
      this.academicForm.patchValue(this.profile);
      this.disableForm();
    }
  }

}