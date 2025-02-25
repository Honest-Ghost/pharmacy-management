import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,

})
export class AppComponent {
  constructor(private router: Router,
    private authService: AuthService
  ) {}

  // Method to check if the current route is the authentication page
  isAuthPage(): boolean {
    return this.router.url === '/auth';
  }

  getUserDetails() {
    return this.authService.getUserDetails();
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }

  viewProfile(event: Event) {
    event.preventDefault();
    this.router.navigate(['/profile']);
  }
}
