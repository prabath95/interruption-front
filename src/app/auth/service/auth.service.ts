import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/utils/http.service';
import { appConfig } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpService) {}

  /***
   * Login API call
   */
  login(userName: string, password: string): Observable<any> {
    return this.http.post(`${appConfig.appRoot}auth/login`, {
      username: userName,
      password,
    });
  }
}
