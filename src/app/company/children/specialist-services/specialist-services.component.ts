import { Component, OnInit } from '@angular/core';
import { Good } from 'src/app/_models/good';
import { DataService } from 'src/app/_services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-specialist-services',
  templateUrl: './specialist-services.component.html',
  styleUrls: ['./specialist-services.component.scss'],
})
export class SpecialistServicesComponent implements OnInit {
  specialistId: number;
  goods: Good[] = [];
  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.specialistId = this.activatedRoute.snapshot.params.specialistId;
    this.dataService.getGoods(this.specialistId)
      .subscribe(
        (data: Good[]) => {
          this.goods = data;
        }
      );
  }
}
