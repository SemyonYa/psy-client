import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Seance } from 'src/app/_models/seance';
import { Good } from 'src/app/_models/good';
import { Observable, of } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  goodId: number;
  good: Good;
  dateString: string;
  date: Date;
  seances: Observable<Seance[]> = of([]);

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private modalController: ModalController) { }

  ngOnInit() {
    this.dateString = this.activatedRoute.snapshot.params.date;
    this.date = new Date(this.dateString);
    this.goodId = this.activatedRoute.snapshot.params.goodId;
    this.dataService.getGood(this.goodId)
      .subscribe(
        (g: Good) => {
          this.good = g;
        }
      );
    this.seances = this.dataService.getGoodSeances(this.goodId, this.dateString);
  }

  async booking(seanceId) {
    const modal = await this.modalController.create({
      component: BookingModalComponent,
      componentProps: {
        seanceId
      }
    });
    return await modal.present();
  }

}
