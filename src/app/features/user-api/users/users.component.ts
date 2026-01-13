import { Component, OnInit, OnDestroy } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UsersApiService } from '../../../core/services/users-api.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {
  users$ = this.usersApi.users$;

  isEditMode = false;
  editingId: number | null = null;

  private destroy$ = new Subject<void>();

  // 🔥 FULLY TYPED FORM (no nulls)
  userForm = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    website: [''],

    address: this.fb.group({
      street: [''],
      suite: [''],
      city: [''],
      zipcode: [''],
      geo: this.fb.group({
        lat: [''],
        lng: [''],
      }),
    }),

    company: this.fb.group({
      name: [''],
      catchPhrase: [''],
      bs: [''],
    }),
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private usersApi: UsersApiService
  ) {}

  ngOnInit(): void {
    this.usersApi.loadUsers();
  }

  submit(): void {
    if (this.userForm.invalid) return;

    const formValue = this.userForm.getRawValue();

    const user: User = {
      id: this.editingId ?? Date.now(),
      ...formValue,
    };

    const request$ = this.isEditMode
      ? this.usersApi.updateUser(user)
      : this.usersApi.addUser(user);

    request$.pipe(takeUntil(this.destroy$)).subscribe(() => this.resetForm());
  }

  editUser(user: User): void {
    this.isEditMode = true;
    this.editingId = user.id;
    this.userForm.patchValue(user);
  }

  deleteUser(id: number): void {
    this.usersApi.deleteUser(id).pipe(takeUntil(this.destroy$)).subscribe();
  }

  resetForm(): void {
    this.userForm.reset();
    this.isEditMode = false;
    this.editingId = null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
