import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CardModule } from 'primeng/card';

import { UsersComponent } from './users/users.component';
import { UserApiRoutingModule } from './user-api-routing.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, HttpClientModule, CardModule, UserApiRoutingModule],
})
export class UsersApiModule {}
