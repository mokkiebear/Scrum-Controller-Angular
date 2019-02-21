import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
  }

}
