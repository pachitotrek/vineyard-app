import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Global } from '../global/global';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  token: String;
  usuario: any=[];


  public estado: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient,private local:LocalStorageService) {
    this.url = Global.url;
    this.cargarStorage();  
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));  
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  Logeado() {
    return (this.token.length > 5) ? true : false;
  }

  checkRole(){
    return (this.usuario.role <2)?true:false;
  }

  logout() {
    localStorage.clear();
    this.cargarStorage();
  }

  checkEmail(email: String) {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'check/' + email, { headers: headers });
  }

  login(datos) {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'login', data, { headers: headers }).pipe(map((resp:any)=>{
      localStorage.setItem('usuario', JSON.stringify(resp.usuarioDB));
      localStorage.setItem('token', resp.token);
      return resp.ok;
    }));  

  }

  register(datos) {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'register', data, { headers: headers });
  }
  getusers() {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'users', { headers: headers });
  }

  









}
