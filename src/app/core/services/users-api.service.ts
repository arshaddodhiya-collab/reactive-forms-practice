import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private API_URL = 'http://localhost:3001/users';

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadUsers(): void {
    this.http
      .get<User[]>(this.API_URL)
      .subscribe((users) => this.usersSubject.next(users));
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.API_URL, user).pipe(
      tap((created) => {
        this.usersSubject.next([...this.usersSubject.value, created]);
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/${user.id}`, user).pipe(
      tap((updated) => {
        const list = this.usersSubject.value.map((u) =>
          u.id === updated.id ? updated : u
        );
        this.usersSubject.next(list);
      })
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(() => {
        this.usersSubject.next(
          this.usersSubject.value.filter((u) => u.id !== id)
        );
      })
    );
  }
}
