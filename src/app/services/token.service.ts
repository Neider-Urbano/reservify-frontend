import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(token: string) {
    setCookie('token', token, { expires: 365, path: '/' });
  }

  getToken() {
    const token = getCookie('token');
    return token;
  }

  removeToken() {
    removeCookie('token');
  }

  isValidToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const decodeToken = jwtDecode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }

    return false;
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken._id || null;
    }
    return null;
  }
}
