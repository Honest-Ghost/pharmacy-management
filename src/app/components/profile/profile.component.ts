import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [CommonModule]
})
export class ProfileComponent implements OnInit {
  userDetails: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userDetails = this.authService.getUserDetails();
  }
}