import {Component, OnInit} from '@angular/core';
import {UserService} from './Services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TaskFront';
 constructor(public userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.userService.check().subscribe((res) => {
      this.userService.authorization = res;
    }, error => console.log(false));
  }

  logout() {
    localStorage.clear();
    this.userService.authorization = false;
    location.href = 'join/login';
  }
}
