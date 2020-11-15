import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.page.html',
  styleUrls: ['./opciones.page.scss'],
})
export class OpcionesPage implements OnInit {
  form:FormGroup;
  data:any=[];
  update:boolean=false;

  
  constructor(private api:ApiService) {
    this.form= new FormGroup({
      _id:new FormControl(null),
      titulo:new FormControl(null,Validators.required)   
    })
   }

  ngOnInit() {
    this.getOpciones();
  }

  crear(){
    this.api.crearOpcion(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.form.reset();
        this.getOpciones();  
      }
    });
  }
  setOpcion(item){
    console.log(item);
    this.update=true;
    this.form.setValue( item );
  }

  updateMenu(){
    this.api.editarOpcion(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.getOpciones();
        this.form.reset(); 
        this.update=false;
      }
    });
  }

  eliminarMenu(id){
    this.api.eliminarOpcion(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.getOpciones();
        this.form.reset(); 
        this.update=false;
      }
    }); 
  }

  getOpciones(){
    this.api.getOpciones().subscribe((resp:any)=>{
      if(resp.ok){      
        this.data=resp.opcion;      
      }
    });
  }

}
