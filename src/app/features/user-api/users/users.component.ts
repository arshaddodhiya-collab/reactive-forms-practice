import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UsersApiService } from '../../../core/services/users-api.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  loading = true;

  private destroy$ = new Subject<void>();

  constructor(private usersApi: UsersApiService) {}

  ngOnInit(): void {
    this.usersApi
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.users = data;
          this.loading = false;
          console.log(this.users);
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
