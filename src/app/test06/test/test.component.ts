import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class Test06TestComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  subscriptionTypes: string[] = ['Basic', 'Advanced', 'Pro'];
  defaultSubscription = 'Advanced';
  submitted = false;
  userSData = {
    email: '',
    password: '',
    subscriptionType: ''
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.userSData.email = this.signupForm.value.userData.email;
    this.userSData.password = this.signupForm.value.userData.password;
    this.userSData.subscriptionType = this.signupForm.value.userData.subscriptionType;
    console.log(this.signupForm);
    this.signupForm.reset();
  }

}
