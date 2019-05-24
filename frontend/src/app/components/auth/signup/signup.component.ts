import { MatSnackBar } from '@angular/material';
import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar) {
    this.registerForm = fb.group({
      name: '',
      email: '',
      password: ''
    });
   }

  ngOnInit() {
  }

  addUser(name, email, password) {
    this.authService.addUser(name, email, password).subscribe(res => {
      this.snackBar.open('Вы успешно зарегистрированы!', 'Ок', { duration: 2000 });
    },
    err => {
      this.snackBar.open(err.error, 'Ок', { duration: 2000 });
    });
  }

}
