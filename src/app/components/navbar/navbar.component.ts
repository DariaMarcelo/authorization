import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAdmin!: boolean;
  isAuthorized!: boolean;

  constructor(private authService: AuthService) {
    this.isAuthorized = authService.isAuthorized
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  logout(): void {
    localStorage.clear();
  }
}
