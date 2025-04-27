import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  template: `
    <h2>Login Component</h2>
    @if(isAuthenticated()) {
    <h2>Welcome back!</h2>
    <button (click)="logout()">Logout</button>
    } @else {
    <h2>Please log in</h2>
    <button (click)="login()">Login</button>
    }
  `,
})
export class LoginComponent {
  isAuthenticated = signal(false);

  login() {
    // Simulate a login action
    this.isAuthenticated.set(true);
  }

  logout() {
    // Simulate a logout action
    this.isAuthenticated.set(false);
  }
}
