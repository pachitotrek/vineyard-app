import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import printjs from 'print-js';
import { NavController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-caja',
  templateUrl: './caja.page.html',
  styleUrls: ['./caja.page.scss'],
})
export class CajaPage implements OnInit, OnDestroy {
  id: string = "";
  item: any = [];
  opciones: any = [];
  opcion_uno:any=[];
  opcion_dos:any=[];
  opcion_tres:any=[];

  numeros: any = [
    { n: 1 },
    { n: 2 },
    { n: 3 },
    { n: 4 },
    { n: 5 },
    { n: 6 },
    { n: 7 },
    { n: 8 },
    { n: 9 },
    { n: 10 }
  ]
  today = Date.now();
  pedido = {
    personas: null,
    menu: "",
    no: null,
    opciones: [],
    fecha: this.today
  }
  datos: any = [];
  ready:boolean=false;
  checked:boolean=false;
  check:FormGroup;
  check1:FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService,private nav:NavController) {
   this.check= new FormGroup({
     a:new FormControl(null)
   });

   this.check1= new FormGroup({
    b:new FormControl(null,Validators.required)
   })   

    setInterval(() => {
      this.today = Date.now();;
    }, 1);
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getMenu(this.id);
    this.getOpciones();
    this.getLast();  
  }
  ngOnDestroy(){
    this.pedido = {
      personas: null,
      menu: "",
      no: null,
      opciones: [],
      fecha: this.today
    }
    this.ready=false;

  }
  ionViewDidLeave() {
 
  }

  getMenu(id) {
    this.api.getmenuitem(id).subscribe((resp: any) => {
      if (resp.ok) {
        this.item = resp.menus[0];  
        console.log(this.item);
      }
    });
  }
  getOpciones() {
    this.api.getOpciones().subscribe((resp: any) => {
      if (resp.ok) {
        this.opciones = resp.opcion;  
      }
    });
  }

  updateTime() {

  }

  change(event) {
    this.pedido.personas = event.detail.value;
  }

  setOpciones(titulo) {   

    let index = this.pedido.opciones.findIndex(e=>e.titulo==titulo);
    
    if(index > -1 ){
      this.pedido.opciones.splice(index,1);    
    }else{
      this.pedido.opciones.push({     
        titulo
      });    
    }
    

  }

  send() {
    this.pedido.menu = this.item.titulo;
    this.pedido.fecha = this.today;
    
    this.api.nuevoPedido(this.pedido).subscribe((resp: any) => {
      if(resp.ok) {   
        this.pedido.personas=0;
        this.pedido.fecha=null;
        this.pedido.menu="";
        this.pedido.no=null;
        this.pedido.opciones=[];
        this.check.reset();
        this.check1.reset();
        this.nav.navigateForward('/pedidos');
  
      }
    });


  }

  getLast() {
    this.api.getlast().subscribe((resp: any) => {

      this.pedido.no = resp.last.no + 1;

    },(err:any)=>{
      this.pedido.no=1;
    });
  }

}
