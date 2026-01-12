import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../core/services/student.service';
import { Student } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html'
})
export class StudentDetailsComponent implements OnInit {

  student: Student = {
    firstName: "",
    middleName: "",  // optional
    lastName: "",
    dob: new Date(),
    studentId: "",
    email: "",
    course: ""
  };

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.student = this.studentService.getStudent();
  }
}
