import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../../core/services/student.service';

import { Student } from '../../../core/models/student.model';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html'
})
export class StudentFormComponent implements OnInit {

  studentForm!: FormGroup;   // ✅ exists

  courses = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Java', value: 'java' }
  ];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstName: [
        '',
        [Validators.required, Validators.minLength(2)]
      ],

      middleName: [''],

      lastName: [
        '',
        [Validators.required, Validators.minLength(2)]
      ],

      dob: [
        null,
        Validators.required
      ],

      studentId: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z0-9]{5,10}$/)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      course: [
        null,
        Validators.required
      ]
    });
  }

  submit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const student: Student = this.studentForm.value;

    this.studentService.setStudent(student);
    this.router.navigate(['/student/details']);
  }

}
