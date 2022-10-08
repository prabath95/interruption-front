import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

export interface Token {
  userId: number;
  userRole: string;
}

export interface Authority {
  authority: string;
}

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  /**
   * Set token in the session storage
   * @param token 
   */
  setToken(token: string) {
    window.sessionStorage.setItem('token', btoa(token));
  }

  /**
   * get token from the session storage
   * @returns 
   */
  getToken(): string {
    const token = window.sessionStorage.getItem('token');
    return token ? atob(token) : '';
  }

  /**
   * decode auth token and return token data 
   * @returns 
   */
  getTokenData(): Token {
    const object = {
      userId: 0,
      userRole: '',
    };
    const token = window.sessionStorage.getItem('token');
    if (token) {
      const decoded: any = jwt_decode(atob(token));

      object.userRole = decoded.userRole;
      object.userId = decoded.userId;
    }
    return object;
  }

  clear() {
    window.sessionStorage.clear();
  }
}
