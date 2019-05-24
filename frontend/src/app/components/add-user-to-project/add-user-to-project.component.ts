import { AuthService } from 'src/app/services/auth.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user-to-project',
  templateUrl: './add-user-to-project.component.html',
  styleUrls: ['./add-user-to-project.component.css']
})
export class AddUserToProjectComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute) { }
  // id проекта
  prId: string;
  user: User;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.prId = params.id;
    });
  }
  findUser(email) {
    this.user = null;
    this.authService.getUserByEmail(email).subscribe(res => {
      this.user = res as User;
      console.log(res);
    });
  }

  addProjectToUser() {
    const user = this.user;
    this.authService.updateUserProjects(user._id, this.prId).subscribe(res => {
      console.log(res);
    });
  }

}
