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
  students: Student[] = [];
  editingIndex = -1;

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

    const formValue = this.studentForm.getRawValue();

    if (this.isEditMode && this.editingIndex > -1) {
      this.students[this.editingIndex] = formValue;
      this.isEditMode = false;
      this.editingIndex = -1;
    } else {
      this.students.push(formValue);
    }

    this.resetForm();
  }

  editStudent(student: Student, index: number): void {
    this.isEditMode = true;
    this.editingIndex = index;
    this.studentForm.patchValue(student);
  }

  reset(): void {
    this.resetForm();
    this.isEditMode = false;
  }

  private resetForm(): void {
    this.studentForm.reset();
    this.editingIndex = -1;
  }
}
