import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { SpecsComponent } from './children/specs/specs.component';
import { SupportComponent } from './children/support/support.component';

const homeRoutes: Routes = [
  {
    path: 'home', component: HomePage,
    children: [
      { path: 'specs', component: SpecsComponent },
      { path: 'support', component: SupportComponent }
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
