import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class AuthPages {

  private _tab: "login" | "register" = 'login';


  setTab(tab: "login" | "register") {
    this._tab = tab;
  }

  get tab(): "login" | "register" {
    return this._tab;
  }

  toggleTab(){
    this._tab = this._tab === 'login' ? 'register' : 'login';
  }
}
