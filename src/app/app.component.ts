import { Component } from '@angular/core';

import { Platform, Events, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalStorageService } from './services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  active:boolean=false;  
  device:any="";
  public appPages = [    
  ];
  usuario: any=[];

  public menu_nav = [  
    {pagina:"Home",link:"/home"},
    {pagina:"Pedidos",link:"/pedidos"},
    {pagina:"Menú",link:"/menu"},    
    {pagina:"Opciones",link:"/opciones"}, 
    {pagina:"Nuevo Usuario",link:"/registrar"} 
  ];
  public menu_user = [     
    {pagina:"Pedidos",link:"/pedidos"} 
  ];



  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private events:Events,
    private menu:MenuController,
    private local:LocalStorageService,
    private router:Router
  ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.device=this.platform.width();  
      this.getDevice(this.device);
      this.checkState();
    });
  }

  menuToogle(){
    this.events.subscribe('menu:toogle', () => {      
      // user and time are the same arguments passed in `events.publish(user, time)`
       if(this.menu.isOpen){            
        this.active=true;
       }else{
         this.active=false;
       } 
    });
  }

  getDevice(width){
    if(width < 1024 ){
      this.active=true;
    }
  }

  logout(){
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 1000);   
  }

  checkState(){
    this.local.cargarStorage('usuario').then((data)=>{    
        this.usuario=data;
        if(this.usuario.role==1){
          this.appPages=this.menu_nav;
        }else{
          this.appPages=this.menu_user;
        }  
    }).catch((error)=>{
      
    });
  }










}
