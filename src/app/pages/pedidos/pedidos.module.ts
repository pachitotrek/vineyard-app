import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PedidosPage } from './pedidos.page';
import { ComponentesModule } from 'src/app/components/componentes.module';

const routes: Routes = [
  {
    path: '',
    component: PedidosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PedidosPage]
})
export class PedidosPageModule {}
