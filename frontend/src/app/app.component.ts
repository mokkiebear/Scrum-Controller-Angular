import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService){}
  title = 'angular-project';
  isAuthenticated: Boolean = localStorage.getItem('token') ? true : false;
  user = this.authService.getUser();
  onLogout(){
    this.authService.logout();
  }

  
}
