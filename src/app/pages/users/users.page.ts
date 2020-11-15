import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  form: FormGroup;
  users:any=[];

  constructor(private us:UserService,private alertController:AlertController) {
    this.form = new FormGroup({
      role:new FormControl(null,Validators.required),    
      user: new FormControl(null, Validators.required),
      pass: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      pass2: new FormControl(null)
    });

    this.form.controls['pass2'].setValidators([
      Validators.required,
      this.Noigual.bind(this.form)
    ])
   }

  ngOnInit() {
    this.getusers();
  }

  Noigual(control: FormControl): { [s: string]: boolean } {
    let data: any = this;
    if (control.value !== data.controls['pass'].value) {
      return {
        noiguales: true
      }
    }
    return null;
  }

  registrar(){
    this.us.register(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.presentAlert();
        this.form.reset();
      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Exito',
      subHeader: 'Usuario Creado',
      message: 'Haz creado un nuevo usuario.',
      buttons: ['OK'],
      mode:'ios'
    });

    await alert.present();
  }

  getusers(){
    this.us.getusers().subscribe((resp:any)=>{
      if(resp.ok){
        this.users=resp.usuario;
        console.log(this.users);
      }
    });
  }


}
