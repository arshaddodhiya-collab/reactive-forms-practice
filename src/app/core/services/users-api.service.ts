import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private API_URL = 'https://mocki.io/v1/117434db-474c-4069-857b-962854535a2a';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL).pipe(shareReplay(1));
  }
}
