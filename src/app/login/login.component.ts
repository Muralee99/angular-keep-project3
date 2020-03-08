import { Component, OnInit } from '@angular/core';
import { Register } from '../register';
import { FormControl , Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  public bearerToken: any;
  public submitMessage: string;

  constructor(private _authService: AuthenticationService,
              private routerService: RouterService) { }

  ngOnInit() {
  }

  getUserNameErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value of username' : ' ';
  }
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value of password' : ' ';
  }

    loginSubmit() {
      const user: Register = new Register(this.username.value, this.password.value);

        this._authService.authenticateUser(user).subscribe(
        res => {
          this.bearerToken = res['token'];
          this._authService.setBearerToken(this.bearerToken);
          this.routerService.routeToDashboard();
        },
        err => {
          this.submitMessage = err.error ? err.error.message : err.message;
        });
    }
}
