import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StudentRoutingModule } from './student-routing.module';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentDetailsComponent } from './student-details/student-details.component';

/* PrimeNG v17 imports */
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    StudentFormComponent,
    StudentDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,   // ✅ REQUIRED
    StudentRoutingModule,

    // ✅ PrimeNG modules
    CardModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    DropdownModule
  ]
})
export class StudentModule { }
