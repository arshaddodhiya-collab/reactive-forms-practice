import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
})
export class StudentFormComponent {
  studentForm!: FormGroup;

  today = new Date();

  // 🔥 Parent state
  submittedStudent: Student = {
    firstName: '',
    middleName: '', // optional
    lastName: '',
    dob: new Date(),
    studentId: '',
    email: '',
    course: '',
  };

  isEditMode = false;

  courses = [
    { label: 'Angular', value: 'Angular' },
    { label: 'React', value: 'React' },
    { label: 'Java', value: 'Java' },
  ];

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      middleName: [''],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dob: [null, Validators.required],
      studentId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      course: [null, Validators.required],
    });
  }

  submit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    this.submittedStudent = this.studentForm.getRawValue();
    this.isEditMode = false;
  }

  editStudent(student: Student): void {
    this.isEditMode = true;
    this.studentForm.patchValue(student);
  }

  reset(): void {
    this.studentForm.reset();
    this.submittedStudent = {
      firstName: '',
      middleName: '', // optional
      lastName: '',
      dob: new Date(),
      studentId: '',
      email: '',
      course: '',
    };
    this.isEditMode = false;
  }
}
