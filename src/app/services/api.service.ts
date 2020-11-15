import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../global/global';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:string;
  constructor(private http:HttpClient) {
    this.url=Global.url;
   }

   crearMenu(datos){
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url+'menu',data,{headers:headers});    
   }
   editarMenu(datos){
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url+'emenu',data,{headers:headers});   
   }
   eliminarMenu(id){    
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url+'deletemenu/'+id,{headers:headers}); 
   }
   getMenu(){    
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url+'getmenu',{headers:headers}); 
   }
   crearOpcion(datos){
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url+'opciones',data,{headers:headers}); 
   }
   editarOpcion(datos){
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url+'eopciones',data,{headers:headers}); 
   }
   eliminarOpcion(id){    
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url+'deleteopcion/'+id,{headers:headers}); 
   }
   getOpciones(){  
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url+'getopciones',{headers:headers}); 
   }
   nuevoPedido(datos){
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url+'nuevopedido',data,{headers:headers}); 
   }
   getmenuitem(id){    
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url+'getmenuid/'+id,{headers:headers}); 
   }
   getlast(){    
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url+'last',{headers:headers}); 
   }
   
  

}
