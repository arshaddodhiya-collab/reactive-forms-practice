import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Student } from '../../../core/models/student.model';
import { StudentStateService } from '../../../core/services/student-state.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  today = new Date();

  // Parent state
  students: Student[] = [];
  editingIndex = -1;
  isEditMode = false;

  courses = [
    { label: 'Angular', value: 'Angular' },
    { label: 'React', value: 'React' },
    { label: 'Java', value: 'Java' },
  ];

  constructor(
    private fb: FormBuilder,
    private studentState: StudentStateService
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      middleName: [''],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dob: [new Date(), Validators.required],
      studentId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      course: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    // 🔥 REAL-TIME FORM → DETAILS
    this.studentForm.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        this.studentState.updateStudent(value as Student);
      });
  }

  submit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const formValue = this.studentForm.getRawValue() as Student;

    if (this.isEditMode && this.editingIndex > -1) {
      this.students[this.editingIndex] = formValue;
    } else {
      this.students.push(formValue);
    }

    this.reset();
  }

  editStudent(student: Student, index: number): void {
    this.isEditMode = true;
    this.editingIndex = index;

    // Patch form
    this.studentForm.patchValue(student);

    // 🔥 sync details immediately on edit
    this.studentState.updateStudent(student);
  }

  reset(): void {
    this.studentForm.reset({
      firstName: '',
      middleName: '',
      lastName: '',
      dob: new Date(),
      studentId: '',
      email: '',
      course: '',
    });
    // this.studentState.reset();

    this.isEditMode = false;
    this.editingIndex = -1;
  }
}
