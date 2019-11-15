import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyPage } from './company.page';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyViewComponent } from './children/company-view/company-view.component';
import { CompanyListComponent } from './children/company-list/company-list.component';
import { SpecialistComponent } from './children/specialist/specialist.component';
import { CompanySpecialistsComponent } from './children/company-specialists/company-specialists.component';
import { ScheduleComponent } from './children/schedule/schedule.component';
import { SpecialistServicesComponent } from './children/specialist-services/specialist-services.component';
import { SpecialistServiceScheduleComponent } from './children/specialist-service-schedule/specialist-service-schedule.component';
import { BookingModalComponent } from './children/booking-modal/booking-modal.component';
import { SecondFactorModalComponent } from './children/second-factor-modal/second-factor.component';


@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CompanyRoutingModule
  ],
  declarations: [
    CompanyPage,
    CompanyViewComponent,
    CompanyListComponent,
    SpecialistComponent,
    CompanySpecialistsComponent,
    ScheduleComponent,
    SpecialistServicesComponent,
    SpecialistServiceScheduleComponent,
    BookingModalComponent,
    SecondFactorModalComponent
  ],
  entryComponents: [
    BookingModalComponent,
    SecondFactorModalComponent
  ]
})
export class CompanyPageModule {}
