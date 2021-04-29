import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators, } from '@angular/forms';
import { User } from '../../shared/interfaces'
import { AuthSerice } from '../../shared/services/auth.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup

  constructor(
    private auth: AuthSerice,
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
    console.log(this.form)
    if (this.form.invalid){
      return
    }
    const user: User = {
      email: this.form.value.inputEmail,
      password: this.form.value.inputPassword,
    }
    this.auth.login(user).subscribe(()=>{
      this.form.reset()
      this.route.navigate(['/admin','dashboard'])
    })

  }
}
