import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class Test07TestComponent implements OnInit {
  projectStatusList = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
  }

}
