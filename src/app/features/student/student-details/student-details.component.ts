// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { Student } from '../../../core/models/student.model';

// @Component({
//   selector: 'app-student-details',
//   templateUrl: './student-details.component.html',
// })
// export class StudentDetailsComponent {
//   @Input({ required: true })
//   student!: Student;

//   @Output()
//   edit = new EventEmitter<void>();

//   onEdit(): void {
//     this.edit.emit();
//   }
// }

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentStateService } from '../../../core/services/student-state.service';
import { Student } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
})
export class StudentDetailsComponent {
  student$: Observable<Student>;

  constructor(private studentState: StudentStateService) {
    this.student$ = this.studentState.student$;
  }

  onEdit() {
    console.log('Edit clicked');
  }
}
