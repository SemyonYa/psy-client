import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing.module';
import { SpecsComponent } from './children/specs/specs.component';
import { SupportComponent } from './children/support/support.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeRoutingModule
  ],
  declarations: [
    HomePage,
    SpecsComponent,
    SupportComponent
  ]
})
export class HomePageModule {
  constructor() { }
}
