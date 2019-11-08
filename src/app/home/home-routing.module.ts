import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { AboutComponent } from './children/about/about.component';
import { StartComponent } from './children/start/start.component';


const homeRoutes: Routes = [
  {
    path: 'home', component: HomePage,
    children: [
      { path: '', component: StartComponent },
      { path: 'about', component: AboutComponent },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ],
  exports: [ RouterModule ]
})
export class HomeRoutingModule { }
