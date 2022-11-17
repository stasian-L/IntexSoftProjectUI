import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  username: string;
  password: string;
  email: string;
  formData: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formData = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),

    });
  }

  onSubmit(data: any) {
    this.username = this.formData.get('username')?.value;
    this.password = this.formData.get('password')?.value;
    this.email = this.formData.get('email')?.value;

    console.log("Login page: " + this.username);
    console.log("Login page: " + this.email);
    console.log("Login page: " + this.password);

    this.authService.register(this.username, this.email, this.password)
      .subscribe(data => {
        console.log("Is Login Success: " + data);

        this.router.navigate(['/login']);
      });
  }

  route() {
    this.router.navigate(['/login']);
  }
}
