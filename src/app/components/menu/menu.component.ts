import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events, MenuController, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

declare const gapi: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menu =[
    {pagina:"Home",link:"home"},
    {pagina:"Pedidos",link:"pedidos"},
    {pagina:"Menú",link:"menu"},    
    {pagina:"Opciones",link:"opciones"},
    {pagina:"Nuevo Usuario",link:"/registrar"}     
  ];
  menu1=[
    {pagina:"Pedidos",link:"pedidos"}
  ]
  pages=[];
  auth2: any = [];
  login:boolean;
  usuario:any=[];
  
  constructor(private router:Router,private events:Events,private menu_c: MenuController,
    private userService:UserService,public loadingController: LoadingController,private local:LocalStorageService) { 
   
    }

  ngOnInit() {    
    this.checkState();
  }


  nav(item){   
    this.router.navigate([`/${item}`]);
  }

  menutoogle(){
    this.events.publish('menu:toogle');
    this.menu_c.open();
  }



  checkState(){
    this.local.cargarStorage('usuario').then((data)=>{
        this.login=true;
        this.usuario=data;
        if(this.usuario.role==1){
          this.pages=this.menu;
        }else{
          this.pages=this.menu1;
        }  
    }).catch((error)=>{
      this.login=false;
    });
  }

  logout(){
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 1000);   
  }



 



}
