import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form:FormGroup;
  constructor(private us:UserService,private router:Router,private alertController:AlertController) {
    this.form= new FormGroup({
      user: new FormControl(null,Validators.required),
      pass: new FormControl(null,[Validators.required,Validators.minLength(6)])
    })
   }

  ngOnInit() {
    if( this.us.Logeado() ){
      this.router.navigate(['/home']);
    }  
  }

  ingresar(){
    this.us.login(this.form.value).subscribe((resp:any)=>{        
        if(resp){      

          this.us.cargarStorage();

          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000); 
          
          this.form.reset(); 
          
        }else{
          this.presentAlert();
        }
    },error=>{
      this.form.reset();
      this.presentAlert();
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Credenciales Erroneas',
      message: 'Haz ingresado datos incorrectos intenta de nuevo.',
      buttons: ['OK'],
      mode:'ios'
    });

    await alert.present();
  }


}
