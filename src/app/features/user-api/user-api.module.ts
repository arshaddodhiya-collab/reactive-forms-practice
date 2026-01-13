import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { UsersComponent } from './users/users.component';
import { UserApiRoutingModule } from './user-api-routing.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,

    // 🔥 REQUIRED FOR formGroup
    ReactiveFormsModule,

    // 🔥 REQUIRED FOR PrimeNG
    CardModule,
    ButtonModule,
    InputTextModule,

    UserApiRoutingModule,
  ],
})
export class UsersApiModule {}
