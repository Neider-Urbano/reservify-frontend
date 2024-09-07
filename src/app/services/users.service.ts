import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { checkToken } from '../interceptors/token.interceptor';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/users`, {
      context: checkToken(),
    });
  }
}
