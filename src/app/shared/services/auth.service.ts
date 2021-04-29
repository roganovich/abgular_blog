import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {User} from '../interfaces'
import {Observable} from 'rxjs'
@Injectable()
export class AuthSerice{

  get toke(): string{
    return ""
  }

  constructor (private http: HttpClient){
  }

  login(user: User): Observable<any> {
    return this.http.post('',user)
  }

  logout(){

  }

  isAuth(): boolean{
    return !!this.token
  }

  private setToken(){

  }
}
