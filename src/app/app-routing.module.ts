import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }
  // { path: 'home', component: HomePage }
  // { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        preloadingStrategy: PreloadAllModules,
        useHash: true,
        scrollPositionRestoration: 'enabled'
      })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {}
 }
