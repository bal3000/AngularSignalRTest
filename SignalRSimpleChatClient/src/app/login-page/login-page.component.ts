import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  name: string;
  @Output() loggedIn = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  setName(): void {
    if (this.name) {
      this.loggedIn.emit(this.name);
    }
  }

}
