import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html'
})
export class StudentFormComponent {

  studentForm!: FormGroup;

  // 🔥 THIS WAS MISSING OR NOT SAVED
  submittedStudent: Student | null = null;

  courses = [
    { label: 'Angular', value: 'Angular' },
    { label: 'React', value: 'React' },
    { label: 'Java', value: 'Java' }
  ];

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      middleName: [''],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dob: [null, Validators.required],
      studentId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      course: [null, Validators.required]
    });
  }

  submit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    // ✅ assign value so template can see it
    this.submittedStudent = this.studentForm.value;
  }
}
