import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'opciones',
    canActivate:[LoginGuard,RoleGuard],
    loadChildren: () => import('./pages/opciones/opciones.module').then(m => m.OpcionesPageModule)
  },
  {
    path: 'caja/:id',
    canActivate:[LoginGuard],
    loadChildren: () => import('./pages/caja/caja.module').then(m => m.CajaPageModule)
  },
  {
    path: 'menu',
    canActivate:[LoginGuard,RoleGuard],
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'pedidos',
    canActivate:[LoginGuard],
    loadChildren: () => import('./pages/pedidos/pedidos.module').then(m => m.PedidosPageModule)
  },
  {
    path: 'registrar',
    canActivate:[LoginGuard,RoleGuard],
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersPageModule)
  },
  {
    path: 'home',
    canActivate:[LoginGuard],
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  }  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,useHash:true })
  ],
  providers:[
    LoginGuard,
    RoleGuard,   
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
