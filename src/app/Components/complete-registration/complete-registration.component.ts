import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {UserService} from '../../Services/user.service';

@Component({
  selector: 'app-complete-registration',
  templateUrl: './complete-registration.component.html',
  styleUrls: ['./complete-registration.component.css']
})
export class CompleteRegistrationComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router) { }
 message = '';
  ngOnInit() {
    this.activatedRoute.params.subscribe((param) => {
      console.log(param.key);
      this.userService.activateAccount(param.key).subscribe((res) => {
        console.log(res);
        if(res) {
          this.message = 'The Account was successfully activated';
          setTimeout(() => {
            this.router.navigateByUrl('join/login');
          }, 3000);
        } else { this.message = 'Invalid URL'; }
      });
    });
  }

}
