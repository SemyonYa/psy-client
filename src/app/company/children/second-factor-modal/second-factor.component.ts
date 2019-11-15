import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Seance } from 'src/app/_models/seance';
import { HelpMe } from 'src/app/_models/help-me';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-second-factor',
  templateUrl: './second-factor-modal.component.html',
  styleUrls: ['./second-factor-modal.component.scss'],
})
export class SecondFactorModalComponent implements OnInit {
  form: FormGroup;
  @Input() bookingFormData: any;
  @Input() seance: Seance;
  constructor(private alertController: AlertController, private modalController: ModalController, private dataService: DataService) { }

  ngOnInit() {
    this.form = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern(/[0-9]{6}/)])
    });
  }

  submit() {
    this.dataService.booking(this.bookingFormData)
      .subscribe(
        (resp) => {
          if (resp === true) {
            this.modalController.dismiss();
            this.success();
          }
        }
      );
  }

  async success() {
    const alert = await this.alertController.create({
      header: 'Услуга успешно забронирована',
      subHeader: 'Данные:',
      message: '<h1>' + this.seance.goodName + '</h1>' +
        '<p>Время: ' + HelpMe.timeToString(this.seance.time) + '</p>' +
        '<p>Стоимость: ' + this.seance.price + '&#8381;</p>' +
        '<p>Имя: ' + this.bookingFormData.clientName + '</p>' +
        '<p>Телефон: ' + this.bookingFormData.clientPhone + '</p>' +
        '<p>E-mail: ' + this.bookingFormData.clientEmail + '</p>',
      buttons: ['OK'],
      cssClass: 'alert-success-booking-window'
    });

    await alert.present();
  }

}
