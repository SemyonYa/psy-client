import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { HelpModalComponent } from '../help-modal/help-modal.component';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  helpVisible = false;
  searchFormVisible = false;
  searchPhrase = '';

  constructor(private modalController: ModalController) { }

  ngOnInit() {

  }

  searchForm() {
    this.searchFormVisible = true;
  }

  async help() {
    const modal = await this.modalController.create({
      component: HelpModalComponent
    });
    return await modal.present();
  }

}
