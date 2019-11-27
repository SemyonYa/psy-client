import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { FormGroup } from '@angular/forms';
import { Seance } from 'src/app/_models/seance';
import { ModalController, AlertController } from '@ionic/angular';
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
  constructor(private dataService: DataService, private modalController: ModalController, private alertController: AlertController) { }

  ngOnInit() {
    this.dataService.getSeance(this.seanceId)
      .subscribe(
        s => {
          this.seance = s;
          console.log('s', this.seance);
          this.form = s.bookingForm();
        }
      );
  }

  submit() {
    if (this.form.valid) {
      this.modalController.dismiss();
      // if (this.dataService.sendCode()) {
      this.secondFactor();
      // }
    }
  }

  secondFactor() {
    this.dataService.preBooking(this.form.value)
      .subscribe(
        (resp) => {
          if (resp === 'busy') {
            this.busy();
          } else if (resp === true) {
            this.showSecondFactorModal();
          } else {
            this.showErrorAlert();
          }
        }
      );
  }

  async showSecondFactorModal() {
    const modal = await this.modalController.create({
      component: SecondFactorModalComponent,
      componentProps: {
        seance: this.seance,
        bookingFormData: this.form.value
      }
    });
    return await modal.present();
  }

  async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Статус бронирования',
      message: 'К сожалению, бронирование в данный момент недоступно. Попробуйте позже.',
      buttons: ['Хорошо!']
    });

    await alert.present();
  }

  async busy() {
    const alert = await this.alertController.create({
      header: 'Бронирование отклонено',
      message: '<p>Данный сеанс уже забронирован или в процессе бронирования другим клиентом.</p>' +
        '<p>Выберите другое время.</p>',
      buttons: ['OK'],
      cssClass: 'alert-success-booking-window'
    });

    await alert.present();
  }
}

