import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  currentUser: object;
  title = 'MEAN-project';

  isAuthenticated: boolean = localStorage.getItem('token') ? true : false;

  constructor(private authService: AuthService) {
     this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  onLogout() {
    this.authService.logout();
  }


}
