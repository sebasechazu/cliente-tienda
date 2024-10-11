import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://api-tienda-production-fa4a.up.railway.app/api'
  public isAuthenticated = signal<boolean>(false);

  constructor( private http: HttpClient, private router:Router) { }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  setToken(token:string){
    localStorage.setItem('token', token);
    this.isAuthenticated.set(true);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  isLoggedIn(){
    return this.isAuthenticated();
  }

  logout(){
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

}
