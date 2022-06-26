import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private users=[
    {username:'admin',password:'1234',roles:['ADMIN','USER']},
    {username:'user1',password:'1234',roles:['USER']},
    {username:'user2',password:'1234',roles:['USER']},
  ];
  public isAuthenticated: boolean;
  public userAutenticated;
  public token: string;

  constructor() { }

  public login(username:string, password:string){
    let user;
    this.users.forEach(u=>{
      if(u.username==username && u.password==password){
        user = u;
        this.token = btoa(JSON.stringify({username:u.username,roles:u.roles}));
      }
    });
    if(user){
      this.isAuthenticated = true;
      this.userAutenticated = user;
    }else{
      this.isAuthenticated = false;
      this.userAutenticated = undefined;
    }
  }

  public isAdmin(){
    if(this.userAutenticated){
      if(this.userAutenticated.roles.indexOf('ADMIN')>-1)
      return true;
    }
    return false;
  }

  public saveAuthenticatedUser(){
    localStorage.setItem('authToken',this.token);
  }

  public loadAuthenticatedUser(){
    let toke = localStorage.getItem('authToken');
    if(toke){
      let user = JSON.parse(atob(toke));
      this.userAutenticated = user;
      this.token = toke;
      this.isAuthenticated = true;
  }
  }

  public removeToken(){
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
    this.token = undefined;
    this.userAutenticated = undefined;
  }
  
}
