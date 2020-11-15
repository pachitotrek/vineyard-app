import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { IonicModule } from '@ionic/angular';





@NgModule({
  declarations: [PublicidadComponent,MenuComponent,FooterComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    PublicidadComponent,MenuComponent,FooterComponent  ]

})
export class ComponentesModule { }
