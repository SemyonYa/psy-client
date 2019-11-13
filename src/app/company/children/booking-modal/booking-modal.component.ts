import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { FormGroup } from '@angular/forms';
import { Seance } from 'src/app/_models/seance';
import { ModalController, AlertController } from '@ionic/angular';
import { HelpMe } from 'src/app/_models/help-me';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss'],
})
export class BookingModalComponent implements OnInit {
  form: FormGroup;
  @Input() seanceId: number;
  seance: Seance;
  constructor(private dataService: DataService, private modalConteroller: ModalController, private alertController: AlertController) { }

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
      console.log(this.form.value);
      this.dataService.booking(this.form.value)
        .subscribe(
          (resp) => {
            if (resp) {
              this.modalConteroller.dismiss();
              this.success();
            }
          }
        );
    }
  }

  async success() {
    const alert = await this.alertController.create({
      header: 'Услуга успешно забронирована',
      subHeader: 'Данные:',
      message: '<h1>' + this.seance.goodName + '</h1>' +
        '<h6>Время: ' + HelpMe.timeToString(this.seance.time) + '</h6>' +
        '<h6>Стоимость: ' + this.seance.price + '&#8381;</h6>' +
        '<h6>Имя: ' + this.form.get('clientName').value + '</h6>' +
        '<h6>Телефон: ' + this.form.get('clientPhone').value + '</h6>' +
        '<h6>E-mail: ' + this.form.get('clientEmail').value + '</h6>',
      buttons: ['OK']
    });

    await alert.present();
  }
}

