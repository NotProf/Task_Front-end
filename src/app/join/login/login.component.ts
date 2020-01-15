import { Component, OnInit } from '@angular/core';
import {UserService} from '../../Services/user.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }
 message = '';
  ngOnInit() {
  }

  Login(form: NgForm) {
    this.userService.login(form.value).subscribe((res) => {
      console.log(res);
      this.userService.authorization = true;
      localStorage.setItem('Authorization', res.headers.get('Authorization'));
      localStorage.setItem('CurrentUser', res.headers.get('CurrentUser'));
      // this.router.navigateByUrl('/');
      location.href = '/';
    }, error => {
      this.message = 'ERROR! Incorrect data or not activated account';
    });
  }
}
