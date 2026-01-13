import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../models/student.model';

const EMPTY_STUDENT: Student = {
  firstName: '',
  middleName: '',
  lastName: '',
  dob: new Date(),
  studentId: '',
  email: '',
  course: '',
};

@Injectable({
  providedIn: 'root',
})
export class StudentStateService {
  private studentSubject = new BehaviorSubject<Student>(EMPTY_STUDENT);

  student$ = this.studentSubject.asObservable();

  updateStudent(student: Student) {
    this.studentSubject.next(student);
  }

  reset() {
    this.studentSubject.next(EMPTY_STUDENT);
  }
}
