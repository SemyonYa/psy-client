import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { Company } from 'src/app/_models/company';
import { Specialist } from 'src/app/_models/specialist';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.scss'],
})
export class CompanyViewComponent implements OnInit {
  id: number;
  company: Company;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.companyId;
    this.dataService.getCompany(this.id)
      .subscribe(
        (c: Company) => {
          this.company = c;
        }
      );
  }

}
