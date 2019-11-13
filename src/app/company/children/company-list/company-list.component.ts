import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { Company } from 'src/app/_models/company';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCompanies();
    this.dataService.companies
      .subscribe(
        (data: Company[]) => {
          this.companies = data;
        }
      );
  }

}
