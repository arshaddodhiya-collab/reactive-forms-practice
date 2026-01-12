import { Component, Input } from '@angular/core';
import { Student } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html'
})
export class StudentDetailsComponent {

  @Input() student!: Student;

}
