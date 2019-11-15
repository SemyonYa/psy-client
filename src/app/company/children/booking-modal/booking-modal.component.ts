import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { FormGroup } from '@angular/forms';
import { Seance } from 'src/app/_models/seance';
import { ModalController} from '@ionic/angular';
import { SecondFactorModalComponent } from '../second-factor-modal/second-factor.component';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss'],
})
export class BookingModalComponent implements OnInit {
  form: FormGroup;
  @Input() seanceId: number;
  seance: Seance;
  constructor(private dataService: DataService, private modalController: ModalController) { }

  ngOnInit() {
    this.dataService.getSeance(this.seanceId)
      .subscribe(
        s => {
          this.seance = s;
          this.form = s.bookingForm();
        }
      );
  }

  submit() {
    if (this.form.valid) {
      this.modalController.dismiss();
      if (this.dataService.sendCode()) {
        this.secondFactor();
      }
    }
  }

  async secondFactor() {
    const modal = await this.modalController.create({
      component: SecondFactorModalComponent,
      componentProps: {
        seance: this.seance,
        bookingFormData: this.form.value
      }
    });
    return await modal.present();
  }
}

