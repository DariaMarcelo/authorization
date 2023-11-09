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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    if (this.authService.getToken() !== null) {
      this.isAuthorized = true;
    } else {
      this.isAuthorized = false;
    }
  }

  logout(): void {
    localStorage.clear();
  }
}
