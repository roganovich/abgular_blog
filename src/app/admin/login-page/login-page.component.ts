import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators, } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  submitted: boolean = false

  constructor(
    public auth: AuthService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      inputEmail: new FormControl(null,[
        Validators.email,
        Validators.required
      ]),
      inputPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    })

  }

  submit (){
    if (this.form.invalid){
      return
    }
    this.submitted = true
    const user: User = {
      email: this.form.value.inputEmail,
      password: this.form.value.inputPassword,
    }
    this.auth.login(user).subscribe(()=>{
      this.form.reset()
      this.submitted = false
      this.route.navigate(['/admin','dashboard'])
    }, () => {
      this.submitted = false
    })

  }
}
