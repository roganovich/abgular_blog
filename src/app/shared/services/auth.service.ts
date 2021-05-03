import {Injectable} from '@angular/core'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {User} from 'src/app/shared/interfaces'
import {Observable, Subject, throwError} from 'rxjs'
import {catchError, tap} from 'rxjs/operators'
import {environment} from 'src/environments/environment'
import {AuthResponse} from 'src/app/shared/interfaces'

@Injectable()
export class AuthService{

  public errors$: Subject<string> = new Subject<string>()

  constructor (private http: HttpClient){
  }

  get token(): string{
    const expDate = new Date(localStorage.getItem('auth-token-exp'))
    if(new Date() > expDate){
      this.logout()
      return null
    }
    return localStorage.getItem('auth-token')
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logout(){
    this.setToken(null)
  }

  isAuth(): boolean {
    return !!this.token
  }

  private handleError(error: HttpErrorResponse){
    const {message} = error.error.error
    switch (message){
      case 'EMAIL_NOT_FOUND':
        this.errors$.next('Неверный Email')
        break
      case 'INVALID_PASSWORD':
        this.errors$.next('Неверный пароль')
      break
    }
    return throwError(error)
  }

  private setToken(response: AuthResponse | null){
    if (response){
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('auth-token', response.idToken)
      localStorage.setItem('auth-token-exp', response.expiresIn.toString())
    }else{
      localStorage.clear()
    }

  }
}
