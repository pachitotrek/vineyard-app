import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  data:any=[];

  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {
    this.getMenu();
  }
  getMenu(){
    this.api.getMenu().subscribe((resp:any)=>{
      if(resp.ok){      
        this.data=resp.menus;      
      }
    });
  }

  direct(id){
    this.router.navigate(['/caja',id]);
  }


}
