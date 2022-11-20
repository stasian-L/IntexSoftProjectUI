import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  formData: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formData = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  onSubmit() {
    this.username = this.formData.get('username')?.value;
    this.password = this.formData.get('password')?.value;

    this.authService.login(this.username, this.password)
      .subscribe(data => {
        console.log("Is Login Success: " + data);

        if (!!data) this.router.navigate(['/home']);
      });
  }

  route() {
    this.router.navigate(['/sign-up']);
  }
}

