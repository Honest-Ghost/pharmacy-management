import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class AuthComponent {
  userId: string = '';
  password: string = '';
  loginFailed: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  // onSubmit() {
  //   if (!this.authService.login(this.userId, this.password)) {
  //     this.loginFailed = true;
  //   }
  // }
  
  onSubmit() {
    this.authService.login(this.userId, this.password).subscribe(
      success => {
        if (!success) {
          this.loginFailed = true;
          this.errorMessage = 'Login failed';
        }
      },
      error => {
        console.error('Login error:', error);
        this.loginFailed = true;
        this.errorMessage = error;
      }
    );
  }
}