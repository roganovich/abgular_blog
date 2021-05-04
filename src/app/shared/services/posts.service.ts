import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataResponse, Post } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class PostService{

  constructor (private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    //return this.http.post<Post>(`${environment.dataUrl}/posts.json`, post)
    return this.http.post(`${environment.dataUrl}/posts.json`, post)
    .pipe(map( (response: DataResponse)=>{
      return {
        ...post,
        id:response.name,
        date: new Date(post.date),
      }
    }))
  }
}
