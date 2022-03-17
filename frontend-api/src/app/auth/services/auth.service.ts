import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from 'src/app/api/api.service';
import { catchError, tap } from 'rxjs/operators';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

const JWT_LOCALSTORE_KEY = 'jwt';
const USER_LOCALSTORE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  constructor( private api: ApiService,private http:HttpClient ) {
    this.initToken();
  }

  initToken() {
    const token = localStorage.getItem(JWT_LOCALSTORE_KEY);
    const user = <User> JSON.parse(localStorage.getItem(USER_LOCALSTORE_KEY));
    if (token && user) {
      this.setTokenAndUser(token, user);
    }
  }

  setTokenAndUser(token: string, user: User) {
    localStorage.setItem(JWT_LOCALSTORE_KEY, token);
    localStorage.setItem(USER_LOCALSTORE_KEY, JSON.stringify(user));
    this.api.setAuthToken(token);
    this.currentUser$.next(user);
  }

  async login(email: string, password: string): Promise<any> {
    return this.api.post('/users/auth/login',
              {email: email, password: password})
              .then((res) => {
                console.log(res);
                res.user.user_id = res.user_id
                this.setTokenAndUser(res.token, res.user);
                return res;
              })
              .catch((e) => { throw e; });
      // return user !== undefined;
  }

  async addMoney(amount:number){
    let user_id = JSON.parse(this.getUser()).user_id
    console.log(user_id);
    return this.api.patch('/users/'+user_id,
              {money_added: amount})
              .then((res) => {})
              .catch((e) => { throw e; });
  }

  logout(): boolean {
    this.setTokenAndUser(null, null);
    return true;
  }

  checkLoginStatus():boolean{
    let item = localStorage.getItem(USER_LOCALSTORE_KEY)
    if(!item||item == 'null'){
      console.log(item);
      return false
    }
    return true
  }

  getUser(){
    return localStorage.getItem(USER_LOCALSTORE_KEY);
  }

  register(user: User, password: string): Promise<any> {
    return this.api.post('/users/auth/',
              {email: user.email, password: password})
              .then((res) => {
                res.user.user_id = res.user_id
                this.setTokenAndUser(res.token, res.user);
                return res;
              })
              .catch((e) => { throw e; });
  }

  getAllUserItems(userId:string){
    return this.api.get(`/users/${userId}/items`)
  }
}
