import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {NgxPrintModule} from 'ngx-print';


import { IonicModule } from '@ionic/angular';

import { CajaPage } from './caja.page';
import { ComponentesModule } from 'src/app/components/componentes.module';

const routes: Routes = [
  {
    path: '',
    component: CajaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesModule,
    ReactiveFormsModule,
    NgxPrintModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CajaPage]
})
export class CajaPageModule {}
