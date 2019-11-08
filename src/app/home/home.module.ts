import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing.module';
import { AboutComponent } from './children/about/about.component';
import { StartComponent } from './children/start/start.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeRoutingModule
  ],
  declarations: [
    HomePage,
    StartComponent,
    AboutComponent
  ]
})
export class HomePageModule {
  constructor() { }
}
