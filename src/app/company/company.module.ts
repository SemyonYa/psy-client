import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyPage } from './company.page';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyViewComponent } from './children/company-view/company-view.component';
import { CompanyListComponent } from './children/company-list/company-list.component';
import { SpecialistComponent } from './children/specialist/specialist.component';
import { CompanySpecialistsComponent } from './children/company-specialists/company-specialists.component';
import { ScheduleComponent } from './children/schedule/schedule.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyRoutingModule
  ],
  declarations: [
    CompanyPage,
    CompanyViewComponent,
    CompanyListComponent,
    SpecialistComponent,
    CompanySpecialistsComponent,
    ScheduleComponent
  ]
})
export class CompanyPageModule {}
