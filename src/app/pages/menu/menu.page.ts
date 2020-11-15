import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-menupage',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  form:FormGroup;
  data:any=[];
  update:boolean=false;
  
  constructor(private api:ApiService) { 
    this.form= new FormGroup({
      _id:new FormControl(null),
      titulo:new FormControl(null,Validators.required),
      descripcion:new FormControl(null)
    })
  }

  ngOnInit() {
    this.getMenu();
  }

  crear(){
    this.api.crearMenu(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.form.reset();
        this.getMenu();
  
      }
    });
  }
  setMenu(data){
    this.form.setValue( data );
    this.update=true;
  }

  updateMenu(){
    this.api.editarMenu(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.getMenu();
        this.form.reset(); 
        this.update=false;
      }
    });
  }

  eliminarMenu(id){
    this.api.eliminarMenu(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.getMenu();
        this.form.reset(); 
        this.update=false;   
      }
    }); 
  }

  getMenu(){
    this.api.getMenu().subscribe((resp:any)=>{
      if(resp.ok){      
        this.data=resp.menus;      
      }
    });
  }


}
