import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CompanyPage } from './company.page';
import { CompanyListComponent } from './children/company-list/company-list.component';
import { CompanyViewComponent } from './children/company-view/company-view.component';
import { SpecialistComponent } from './children/specialist/specialist.component';
import { CompanySpecialistsComponent } from './children/company-specialists/company-specialists.component';
import { ScheduleComponent } from './children/schedule/schedule.component';


const companyRoutes: Routes = [
  {
    path: 'company', component: CompanyPage,
    children: [
      { path: '', component: CompanyListComponent, pathMatch: 'full' },
      {
        path: ':cId', component: CompanyViewComponent,
        children: [
          { path: '', component: CompanySpecialistsComponent, pathMatch: 'full' },
          { path: ':sId', component: SpecialistComponent },
          { path: ':sId/:date', component: ScheduleComponent }
        ]
      },
      // { path: ':cId/:sId', component: SpecialistComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(companyRoutes)
  ],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
