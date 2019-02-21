import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
  }

}
