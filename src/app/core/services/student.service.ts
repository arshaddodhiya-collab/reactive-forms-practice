import { Injectable } from '@angular/core';

// import Student interface
import { Student } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private studentData!: Student;

  setStudent(data: Student): void {
    this.studentData = data;
  }

  getStudent(): Student {
    return this.studentData;
  }
}
