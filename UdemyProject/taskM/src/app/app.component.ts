import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //someProperty: string = "<script>alert('sujith alert')</script>";
  title: string = "taskM";
  constructor(public loginService: LoginService) {
  }

  onSearchClick() {
    console.log(this.loginService.currentUserName);
  }
}