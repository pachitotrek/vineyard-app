import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items=[
    {
      nombre:'Pedidos',
      descripcion:'Agregue un nuevo Pedido',
      url:'/pedidos'
    },
    {
      nombre:'Menus Actuales',
      descripcion:'Agregue nuevos Menus , Edite o elimine algun menu existente',
      url:'/menu'
    },
    {
      nombre:'Opciones Actuales',
      descripcion:'Agregue nuevos Opciones , Edite o elimine alguna opción existente',
      url:'/opciones'
    }   
  ];
  usuario:any=[];

  constructor(private local:LocalStorageService,private router:Router) {
    this.checkState();
   }

  ngOnInit() {
  }
  checkState(){
    this.local.cargarStorage('usuario').then((data)=>{      
        this.usuario=data;
        if(this.usuario.role==2){
          this.router.navigate(['/pedidos']);
        }
    }).catch((error)=>{
     
    });
  }

}
