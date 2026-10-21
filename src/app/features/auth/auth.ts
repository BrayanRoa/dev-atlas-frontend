import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login';

@Component({
  selector: 'app-auth',
  imports: [LoginComponent],
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
