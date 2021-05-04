import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {FormControl, FormGroup, Validators, } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth.service';
import { Post, User } from 'src/app/shared/interfaces';
import { PostService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup

  constructor(
      public auth: AuthService,
      private router: Router,
      private route: ActivatedRoute,
      private postService: PostService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      inputTitle: new FormControl(null,[
        Validators.required,
        Validators.minLength(4),
      ]),
      inputSlug: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      inputBody: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    })
  }

  submit (){
    if (this.form.invalid){
      return
    }

    const post: Post = {
      title: this.form.value.inputTitle,
      slug: this.form.value.inputSlug,
      body: this.form.value.inputBody,
      date: new Date()
    }
    console.log(this.form)

    this.postService.create(post).subscribe( () => {
      this.form.reset()
    })

  }

}
